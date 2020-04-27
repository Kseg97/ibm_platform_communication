const Http = new XMLHttpRequest();
const url='https://c612a48e-6c75-40f8-b275-f9958a5e1317-bluemix:346a8f8b4a86fab70993f3ba0a434d1b6d7ead444a387e6bcb651a4750b420f9@c612a48e-6c75-40f8-b275-f9958a5e1317-bluemix.cloudantnosqldb.appdomain.cloud/ventilator_db/_find';
Http.open("POST", url);
Http.send();

Http.onreadystatechange = (e) => {
  console.log(Http.responseText)
}