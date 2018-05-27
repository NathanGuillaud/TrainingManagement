DELIMITER //

-- Trigger pour ajouter une inscription à sa facture correspondante
CREATE TRIGGER addInvoice
AFTER INSERT ON enrollment
FOR EACH ROW
BEGIN
    DECLARE currentTrainingId int(11);
    DECLARE currentPrice float;
    DECLARE currentUserId int(11);
    DECLARE nbInvoice int(11);
    -- Récupération de l'ID du stage, de l'utilisateur et du prix de la séance à ajouter
    -- On regarde aussi si une facture existe ou non (1 ligne ou 0)
    SELECT count(*), course.TrainingId, course.price, enrollment.UserId INTO nbInvoice, currentTrainingId, currentPrice, currentUserId
    FROM enrollment, course, invoice
    WHERE enrollment.CourseId = course.id
    AND course.TrainingId = invoice.TrainingId
    AND enrollment.id = NEW.id
    AND invoice.UserId = NEW.UserId;
    -- Si c'est la première inscription pour un utilisateur à ce stage, création d'une facture
    IF (nbInvoice = 0) THEN
        INSERT INTO invoice VALUES(NULL, currentPrice, '', '', currentTrainingId, currentUserId);
    ELSE
        -- Augmentation du prix de la facture
        UPDATE invoice SET price = price + currentPrice
        WHERE TrainingId = currentTrainingId
        AND UserId = NEW.UserId;
    END IF;
END; //

DELIMITER ;