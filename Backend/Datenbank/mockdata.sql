INSERT INTO `sanplanba`.`address` (`address`, `street`, `house_number`, `postal_code`, `city`) VALUES ('Ratiopharm Arena', 'Europastraße', '25', '89231', 'Neu-Ulm');

INSERT INTO `sanplanba`.`person` (`first_name`, `last_name`) VALUES ('Otto', 'Päde');
INSERT INTO `sanplanba`.`person` (`first_name`, `last_name`) VALUES ('Sunny', 'Täter');

INSERT INTO `sanplanba`.`service` (`address_id`, `person_id`, `title`, `start`, `end`) VALUES ('1', '2', 'Basketball: Ulm vs. Oldenburg', '2021-06-30 15:00:00', '2021-06-30 19:00:00');

INSERT INTO `sanplanba`.`medical_service` (`service_id`, `number`, `contact_person`, `annotations`) VALUES ('1', '#1/21', 'Herr Müller', 'Seiteneingang verwenden');

INSERT INTO `sanplanba`.`article_usage` (`service_id`, `person_id`, `article_id`, `quantity`, `time`) VALUES ('1', '1', '235', '1', '2021-06-29 16:45:00');
INSERT INTO `sanplanba`.`article_usage` (`service_id`, `person_id`, `article_id`, `quantity`, `time`) VALUES ('1', '2', '144', '1', '2021-06-29 17:20:00');