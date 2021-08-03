export default function DataSurvey(schooling) {

  switch (schooling) {
    case '0':
      return {
        middleSchoolStudying: true,
        middleSchoolComplete: false,
        highSchoolStudying: false,
        highSchoolComplete: false,
      }
    case '1':
      return {
        middleSchoolStudying: false,
        middleSchoolComplete: true,
        highSchoolStudying: false,
        highSchoolComplete: false,
      }
    case '2':
      return {
        middleSchoolStudying: false,
        middleSchoolComplete: true,
        highSchoolStudying: true,
        highSchoolComplete: false,
      }
    case '3':
      return {
        middleSchoolStudying: false,
        middleSchoolComplete: true,
        highSchoolStudying: false,
        highSchoolComplete: true,
      }
  }
}