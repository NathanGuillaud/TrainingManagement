-- Procédure pour ajouter une inscription à sa facture correspondante
CREATE OR REPLACE FUNCTION addInvoice() RETURNS trigger AS $addInvoice$
    DECLARE
        currentTrainingId integer;
        currentPrice decimal(5,2);
        currentMemberId integer;
        nbInvoice bigint;
    BEGIN
        -- Récupération de l'ID du stage, de l'utilisateur et du prix de la séance à ajouter
        SELECT course."TrainingId", enrollment."MemberId", course.price INTO currentTrainingId, currentMemberId, currentPrice
        FROM enrollment, course
        WHERE enrollment."CourseId" = course.id
        AND enrollment.id = NEW.id
        AND enrollment."MemberId" = NEW."MemberId";

        -- Pour savoir si il existe une facture pour ce stage et cet utilisateur ou non
        SELECT count(*) INTO nbInvoice
        FROM enrollment, course, invoice
        WHERE enrollment."CourseId" = course.id
        AND course."TrainingId" = invoice."TrainingId"
        AND enrollment.id = NEW.id
        AND invoice."MemberId" = NEW."MemberId";

        -- Si c'est la première inscription pour un utilisateur à ce stage, création d'une facture
        IF (nbInvoice = 0) THEN
            INSERT INTO invoice VALUES(DEFAULT, currentPrice, '2018-01-01', '2018-01-01', currentTrainingId, currentMemberId);
        ELSE

            -- Sinon, on augmentation du prix de la facture existante
            UPDATE invoice SET price = price + currentPrice
            WHERE "TrainingId" = currentTrainingId
            AND "MemberId" = NEW."MemberId";

        END IF;
        RETURN NULL;
    END;
$addInvoice$ LANGUAGE plpgsql;

-- Trigger pour ajouter une inscription à sa facture correspondante
DROP TRIGGER IF EXISTS addInvoice ON enrollment;
CREATE TRIGGER addInvoice
AFTER INSERT ON enrollment
FOR EACH ROW
EXECUTE PROCEDURE addInvoice();