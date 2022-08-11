function checkProjectStatus() {
  var spreadsheetID = SpreadsheetApp.getActiveSpreadsheet().getId()  //gives us the ID
  var rangeName = 'Sheet3!A:A'  //defining our range
  var values = Sheets.Spreadsheets.Values.get(spreadsheetID, rangeName).values 
  var baseUrl = 'https://cloudresourcemanager.googleapis.com/v3/projects/'
  var oAuthToken = ScriptApp.getOAuthToken()

  var options2 = {  //all the credentials for our GET call
    'muteHttpExceptions' : true,
    'method' : 'get',
    'contentType': 'application/json',
    'headers' : {
      'Authorization' : 'Bearer ' + oAuthToken.toString()
    } 
  }

  for (var row = 0; row < values.length; row++) {
    var projectID = values[row][0]
    var removalURL = baseUrl + projectID.toString()
    Logger.log(removalURL)
    var response2 = JSON.parse(UrlFetchApp.fetch(removalURL, options2)) //confirm the project status by making a GET call
    Logger.log(response2)
  }
}
