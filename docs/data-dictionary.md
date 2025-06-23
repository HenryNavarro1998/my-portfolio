# Diccionario de Datos - Portafolio

## Tabla: PROJECTS
| Columna      | Tipo      | Descripción                        | Restricciones         |
|-------------|-----------|------------------------------------|----------------------|
| id          | INT       | ID único del proyecto              | PK, autoincrement    |
| title       | VARCHAR   | Título del proyecto                | NOT NULL             |
| description | TEXT      | Descripción del proyecto           |                      |
| type        | VARCHAR   | Categoría o tipo de proyecto       |                      |

## Tabla: TECHNOLOGIES
| Columna    | Tipo      | Descripción                        | Restricciones         |
|------------|-----------|------------------------------------|----------------------|
| id         | INT       | ID único de la tecnología          | PK, autoincrement    |
| name       | VARCHAR   | Nombre de la tecnología            | NOT NULL, UNIQUE     |
| icon       | VARCHAR   | URL o path del ícono               |                      |
| level      | INT       | Nivel de experiencia (1-100)        |                      |
| levelText  | VARCHAR   | Texto descriptivo del nivel         |                      |

## Tabla: PROJECT_TECHNOLOGIES (relación N:M)
| Columna        | Tipo      | Descripción                        | Restricciones         |
|---------------|-----------|------------------------------------|----------------------|
| project_id     | INT       | FK a PROJECTS.id                   | PK, FK               |
| technology_id  | INT       | FK a TECHNOLOGIES.id               | PK, FK               |

## Tabla: SKILLS
| Columna    | Tipo      | Descripción                        | Restricciones         |
|------------|-----------|------------------------------------|----------------------|
| id         | INT       | ID único de la habilidad           | PK, autoincrement    |
| name       | VARCHAR   | Nombre de la habilidad             | NOT NULL, UNIQUE     |

## Tabla: MESSAGES
| Columna    | Tipo      | Descripción                        | Restricciones         |
|------------|-----------|------------------------------------|----------------------|
| id         | INT       | ID único del mensaje               | PK, autoincrement    |
| name       | VARCHAR   | Nombre del remitente               | NOT NULL             |
| lastname   | VARCHAR   | Apellido del remitente             | NOT NULL             |
| email      | VARCHAR   | Correo electrónico del remitente   | NOT NULL             |
| subject    | VARCHAR   | Asunto del mensaje                 | NOT NULL             |
| message    | TEXT      | Contenido del mensaje              | NOT NULL             |
| createdAt  | DATETIME  | Fecha y hora de creación           | NOT NULL, default NOW| 