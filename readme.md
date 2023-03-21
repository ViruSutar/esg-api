## API Endpoints
- `POST /api/register`: Register user.
- `POST /api/login`: Login using email and password.
- `GET /api/getQuestions`: Get list of questions
- `POST /api/saveResponse`: save answered questions in the database
- `GET /api/getResponses`:get responses saved in the database
- `GET /api/attachDocument`: attach document to the question


## `/getQuestions`

## fetch list of questions

## Response
```
 "data": [
        {
            "_id": "641675d358e921fe5e1ba1e0",
            "question": "Permanent Employees(D)"
        },
        {
            "_id": "641675d358e921fe5e1ba1d1",
            "question": "Name of the Listed Entity"
        },
        {
            "_id": "641675d358e921fe5e1ba1d8",
            "question": "Financial year for which reporting is being done"
        },
        ]
```

## saveResponse
## save user response in the database 
## Input
```
 "responses": [
      {
        "questionId":"641675d358e921fe5e1ba1d0",
        "question": "Corporate Identify Number (CIN) of the Listed Entity",
        "answers":[12234252]
      },
      {
        "questionId":"641675d358e921fe5e1ba1d1",
        "question": "Name of the Listed Entity",
        "answers":["New entity"]
      },
      {
        "questionId":"641675d358e921fe5e1ba1d2",
        "question": "Year of incorporation",
        "answers":[2012]
      },
 ]
```


## getResponses
## get responses of the loggedIn user 
## Response

```
"success": true,
    "data": [
        {
            "_id": "64189b9c0bec4e86120ceba9",
            "answers": [
                12234252
            ],
            "question": "Corporate Identify Number (CIN) of the Listed Entity"
        },
        {
            "_id": "64189b9c0bec4e86120cebaa",
            "answers": [
                "New entity"
            ],
            "question": "Name of the Listed Entity"
        },
    ]
```


## AttachDocument
## we can attach any documents like images ,pdfs,excel files to the question
## Input
- `file` - File you want to attach
- `questionId` - Id of question on which file needs to attach