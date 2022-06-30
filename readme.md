# BiFrost API Testing Framework -SuperTest, Mocha, Chai, Mochawesome,JUnit

## Integration and Middleware Testing for Mulesoft APIs
Validate Stack of APIS in Mulesoft architecture

## Installables

1. Visit https://nodejs.dev/download/ Node (16.15.0) 
2. npm(Latest Version).
3. mocha framework and chai Assertion libraries to install the required npm packages:
   ## npm i -D supertest mocha chai
4. Execute tests
   ## npm test (Check Package.json for more details)
5. For generating the mochawesome report, 
   ## npm run report  
6. Installation of npm mocha 
   ## npm install -g mocha
7. For  generating the junit reports,
   ## mocha test --reporter mocha-junit-reporter


/* $body = @{
"client_id"="****************************"
"client_secret"="********************************************"
} | ConvertTo-Json
$header = @{
"Content-Type"="application/json"
}
$token = Invoke-RestMethod -Uri "https://xray.cloud.xpand-it.com/api/v2/authenticate" -Method 'Post' -Body $body -ContentType "application/json"

Write-Host "Auth Result: $token"

curl.exe -H "Content-Type: text/xml" -X POST -H "Authorization: Bearer $token" --data @C:\Temp2\test-results.xml https://xray.cloud.xpand-it.com/api/v2/import/execution/junit?testExecKey=SQ-75*/
