-- Procédure pour retirer une inscription de sa facture correspondante
CREATE OR REPLACE FUNCTION reduceInvoice() RETURNS trigger AS $reduceInvoice$
    DECLARE
        currentTrainingId integer;
        currentPrice decimal(5,2);
        currentInvoicePrice decimal(5,2);
        currentInvoiceId integer;
    BEGIN
        -- Récupération de l'ID du stage, de l'utilisateur et du prix de la séance à retirer
        SELECT course."TrainingId", course.price INTO currentTrainingId, currentPrice
        FROM course
        WHERE OLD."CourseId" = course.id;

        -- Réduction du prix de la facture
        UPDATE invoice SET price = price - currentPrice
        WHERE "TrainingId" = currentTrainingId
        AND "MemberId" = OLD."MemberId";

        -- Récupération de la facture (pour la supprimer si le prix est de 0)
        SELECT price, id INTO currentInvoicePrice, currentInvoiceId
        FROM invoice
        WHERE "TrainingId" = currentTrainingId
        AND "MemberId" = OLD."MemberId";

        -- Si le prix est 0, supprimer la facture
        IF (currentInvoicePrice = 0) THEN
            DELETE FROM invoice WHERE id = currentInvoiceId;
        END IF;
        RETURN NULL;
    END;
$reduceInvoice$ LANGUAGE plpgsql;

-- Trigger pour retirer une inscription à sa facture correspondante
DROP TRIGGER IF EXISTS reduceInvoice ON enrollment;
CREATE TRIGGER reduceInvoice
AFTER DELETE ON enrollment
FOR EACH ROW
EXECUTE PROCEDURE reduceInvoice();