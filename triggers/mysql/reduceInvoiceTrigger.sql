DELIMITER //

-- Trigger pour retirer une inscription de sa facture correspondante
CREATE TRIGGER reduceInvoice
AFTER DELETE ON enrollment
FOR EACH ROW
BEGIN
    DECLARE currentTrainingId int(11);
    DECLARE currentPrice float;
    DECLARE currentUserId int(11);
    DECLARE currentInvoicePrice float;
    DECLARE currentInvoiceId int(11);
    DECLARE nbInvoice int(11);
    -- Récupération de l'ID du stage, de l'utilisateur et du prix de la séance à retirer
    SELECT count(*), course.TrainingId, course.price, enrollment.UserId INTO nbInvoice, currentTrainingId, currentPrice, currentUserId
    FROM enrollment, course, invoice
    WHERE enrollment.CourseId = course.id
    AND course.TrainingId = invoice.TrainingId
    AND enrollment.CourseId = OLD.CourseId
    AND invoice.UserId = OLD.UserId;
    -- Réduction du prix de la facture
    UPDATE invoice SET price = price - currentPrice
    WHERE TrainingId = currentTrainingId
    AND UserId = OLD.UserId;
    -- Récupération de la facture
    SELECT price, id INTO currentInvoicePrice, currentInvoiceId
    FROM invoice
    WHERE TrainingId = currentTrainingId
    AND UserId = OLD.UserId;
    -- Si le prix est 0, supprimer la facture
    IF (currentInvoicePrice = 0) THEN
        DELETE FROM invoice WHERE id = currentInvoiceId;
    END IF;
END; //

DELIMITER ;