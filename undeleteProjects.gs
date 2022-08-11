function undeleteProjects() {
  var spreadsheetID = SpreadsheetApp.getActiveSpreadsheet().getId()  //gives us the ID
  var rangeName = 'Sheet3!A1:A'  //defining our range
  var values = Sheets.Spreadsheets.Values.get(spreadsheetID, rangeName).values 
  var baseUrl = 'https://cloudresourcemanager.googleapis.com/v3/projects/'
  var oAuthToken = ScriptApp.getOAuthToken()
  var options = {  //all the credentials for our POST call
    'muteHttpExceptions' : true,
    'method' : 'POST',
    'contentType': 'application/json',
    'headers' : {
      'Authorization' : 'Bearer ' + oAuthToken.toString()
    } 
  }

  for (var row = 0; row < values.length; row++) {
    var projectID = values[row][0]
    var restoralURL = baseUrl + projectID.toString() + ":undelete"
    Logger.log(restoralURL)
    var response = JSON.parse(UrlFetchApp.fetch(restoralURL, options)); //make the POST call
    Logger.log(response)
  }
}
