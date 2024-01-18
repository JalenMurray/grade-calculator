# Routes

These are the components used as routes
| Name | Description |
| ---- | ----------- |
| [Class-Page](#Class-Page) | Contains the calculator for a class, along with other class information |
| [Guest-Class](#Guest-Class) | Contains the calculator for a guest class that does not require login.  When the page is closed or refreshed the data on the page will be lost |
| [Semester-Page](#Semester-Page) | Contains information for a specific semester |
| [Semesters](#Semesters) | Contains a list of all semesters that belong to the user |
| [Navigation](#Navigation) | Navbar for the Site.  Contains Profile Picture and Nav Links |
| [Home](#Home) | Landing Page for the site. |


## Class-Page

#### Description
Holds information about a class that is fetched from a database.  Heart of the app that allows students to input assignment types and assignments to calculate their current or potential grades. When a form is submitted, add button is pressed, or an input is unselected an api call is made to the backend to update the database.

#### Params
 - :id - The id of the class in the database

#### Features
See components directory for a more detailed look at these features.
 - Assignment Types - Allows Students to create assignment types that allow them to organize a group of assignments.
 - Progress Bar - Dynamic Progress Bar that fills up and showcases a percentage based on the current score.  Has colors based on grade.  (Hope to eventually add customization to that)
 - Desired Score - Small box that showcases an editable desired score for the class.  Will show how far the current score is from the desired score with colors that dynamically change based on the distance.  If desired score is reached it will display a success msg.
 - Edit Class - Modal that allows Student to edit information about the class including code, title, desired score.

## Guest-Class

#### Description
Page used for guests who do not want / can't login but still want to use the calculator features.  Contains similar features to [Class-Page](#class-page), but doesn't update the database when edited.

#### Params
None

#### Features
Same as [Class-Page Features](#features) except edit class and no customization.

## Semester-Page

#### Description

#### Params
 - :id - The id of the semester in the database

#### Features

## Semesters

#### Description

#### Params
None

#### Features

## Navigation

#### Description

#### Params
None

#### Features

## Home

#### Description

#### Params
None

#### Features
