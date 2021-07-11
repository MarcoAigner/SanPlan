INSERT INTO `sanplanba`.`address` (`address`, `street`, `house_number`, `postal_code`, `city`) VALUES ('Ratiopharm Arena', 'Europastraße', '25', '89231', 'Neu-Ulm');
INSERT INTO `sanplanba`.`address` (`address`, `street`, `house_number`, `postal_code`, `city`) VALUES ('BRK Kreisverband Neu-Ulm', 'Pfaffenweg', '42', '89231', 'Neu-Ulm');

INSERT INTO `sanplanba`.`person` (`first_name`, `last_name`) VALUES ('Gerolt', 'Steiner');
INSERT INTO `sanplanba`.`person` (`first_name`, `last_name`) VALUES ('Sunny', 'Täter');
INSERT INTO `sanplanba`.`person` (`first_name`, `last_name`) VALUES ('Ernst', 'Fall');
INSERT INTO `sanplanba`.`person` (`first_name`, `last_name`) VALUES ('Lisa', 'Bonn');
INSERT INTO `sanplanba`.`person` (`first_name`, `last_name`) VALUES ('Otto', 'Päde');

INSERT INTO `sanplanba`.`service` (`address_id`, `person_id`, `title`, `start`, `end`, `active`) VALUES ('2', '3', 'Dienstabend: Zeltaufbau', '2021-06-29 19:00:00', '2021-06-29 21:00:00', '0');
INSERT INTO `sanplanba`.`service` (`address_id`, `person_id`, `title`, `start`, `end`) VALUES ('1', '4', 'Basketball: Ulm vs. Oldenburg', '2021-06-30 15:00:00', '2021-06-30 19:00:00');

INSERT INTO `sanplanba`.`medical_service` (`service_id`, `number`, `contact_person`, `annotations`) VALUES ('2', '#1/21', 'Herr Müller', 'Seiteneingang verwenden');

INSERT INTO `sanplanba`.`article_usage` (`service_id`, `person_id`, `article_id`, `quantity`, `time`) VALUES ('2', '1', '235', '1', '2021-06-29 16:45:00');
INSERT INTO `sanplanba`.`article_usage` (`service_id`, `person_id`, `article_id`, `quantity`, `time`) VALUES ('2', '3', '144', '1', '2021-06-29 17:20:00');