#Depot
Depot is a Android app distribution platform with a simple api and user interface.

##REST API

###Common Response Codes
Code | Meaning
----:|:--------
200  | Valid request
401  | Unauthorized
404  | Could not find requested resource

###Post Application Version
Request:

```
POST {depot-url}/api/projects/{project-id}/versions/
```

Response:

`200`
```javascript
{
    "name": "String",
    "package": "com.package.name",
    "versionCode": "1",
    "versionName": "0.0.1",
    "minSdkVersion": "15",
    "targetSdkVersion": "19",
    "releaseDate": "2014-08-02T16:17-04:00",
    "releaseNotes": "",
    "downloadLink": "link-to-download.apk",
    "id": "0123456789abcdef"
}
```

###Post release notes
Request:

```
POST {depot-url}/api/projects/{project-id}/versions/{version-id}/releaseNotes
```

Response:

`200`
```javascript
{
    "name": "String",
    "package": "com.package.name",
    "versionCode": "1",
    "versionName": "0.0.1",
    "minSdkVersion": "15",
    "targetSdkVersion": "19",
    "releaseNotes": "Release notes for this version: simple formatting, to be determined",
    "releaseDate": "2014-08-02T16:17-04:00",
    "downloadLink": "link-to-download.apk",
    "id": "0123456789abcdef"
}
```

###Delete apk and release notes

Request:

```
DELETE {depot-url}/api/projects/{project-id}/versions/{version-id}
```
Header:
- `userId`: userId of the current user, to verify ability to delete (email?)

Response:

`200`

###Get list of apps
Request:

```
GET {depot-url}/api/projects/{projectId}/versions/
```

Response:

`200`
```javascript
[
    {
        "name": "App 1",
        "package": "com.package.name",
        "versionCode": "1",
        "versionName": "0.0.1",
        "minSdkVersion": "15",
        "targetSdkVersion": "19",
        "releaseDate": "2014-07-31T15:36-04:00",
        "releaseNotes": "",
        "downloadLink": "{depot-url}/app/{project-id}/{app-identifier}.apk",
        "id": "0123456789abcdef"
    },
    {
        "name": "App 2",
        "package": "com.package.name.two",
        "versionCode": "2",
        "versionName": "0.2.3",
        "minSdkVersion": "15",
        "targetSdkVersion": "20",
        "releaseDate": "2014-08-02T08:00-04:00",
        "releaseNotes": "Release notes for this version: simple formatting, to be determined",
        "downloadLink": "{depot-url}/app/{project-id}/{app-identifier}.apk",
        "id": "123456789abcdef0"
    },
    ...
]
```
