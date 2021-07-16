SELECT service.title, article.name, article.unit, article_usage.quantity, CONCAT(person.first_name, ' ', person.last_name) AS 'Verbraucht von', article_usage.time, article_usage.status
FROM article_usage
JOIN article ON article_usage.article_id = article.id
JOIN person ON article_usage.person_id = person.id
JOIN service ON article_usage.service_id = service.id