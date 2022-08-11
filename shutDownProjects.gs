function shutDownProjects() {
  var spreadsheetID = SpreadsheetApp.getActiveSpreadsheet().getId()  //gives us the ID
  var rangeName = 'Sheet1!A2:A'  //defining our range
  var values = Sheets.Spreadsheets.Values.get(spreadsheetID, rangeName).values 
  var baseUrl = 'https://cloudresourcemanager.googleapis.com/v3/projects/'
  var oAuthToken = ScriptApp.getOAuthToken()
  var options = {  //all the credentials for our DELETE call
    'muteHttpExceptions' : true,
    'method' : 'delete',
    'contentType': 'application/json',
    'headers' : {
      'Authorization' : 'Bearer ' + oAuthToken.toString()
    } 
  }

  for (var row = 0; row < values.length; row++) {
    var projectID = values[row][0]
    var removalURL = baseUrl + projectID.toString()
    Logger.log(removalURL)
    var response = JSON.parse(UrlFetchApp.fetch(removalURL, options)); //make the DELETE call
    Logger.log(response)
  }
}
