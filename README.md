# Meetup Package
The Meetup API provides simple RESTful HTTP and streaming interfaces for extending your community using the Meetup platform from your own apps.
* Domain: meetup.com
* Credentials: accessToken

## How to get credentials: 
The Meetup API provides support for OAuth 2, the superseding specification for OAuth 1, authentication. This protocol requires all client communication with the Meetup servers to use HTTPS. If your application does not, our servers will response with a 400 error and a message asking you to do so.

Read more about [Meetup OAuth2 authenticating](https://www.meetup.com/meetup_api/auth/#oauth2).

## Meetup.getAccessToken
OAuth2

| Field       | Type       | Description
|-------------|------------|----------
| clientId    | credentials| Required: App key from meetup developer console
| clientSecret| credentials| Required: App secret from meetup developer console
| code        | String     | Required: Ouath code
| redirectUri | String     | Required: App redirect URI

## Meetup.getCategories
Returns a list of Meetup group categories

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| fields     | String     | Parameter for requesting optional response properties

## Meetup.getCategories
Returns a list of Meetup group categories

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| fields     | String     | Parameter for requesting optional response properties

## Meetup.getDashboard
A dashboard of aggregated Meetup information for the authorized member

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| fields     | String     | Request that additional fields (separated by commas) be included in the output

## Meetup.getTopicCategories
Returns a list of Meetup topic categories

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| fields     | String     | Parameter for requesting optional response properties
| radius     | String     | Use a given latitude/longitude/radius (miles) to search best_topics for instead of using the member's lat/lon.  When present, all three are required.
| longitude  | String     | Use a given latitude/longitude/radius (miles) to search best_topics for instead of using the member's lat/lon.  When present, all three are required.
| latitude   | String     | Use a given latitude/longitude/radius (miles) to search best_topics for instead of using the member's lat/lon.  When present, all three are required.

## Meetup.getTopics
API method for accessing meetup topics

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| memberId   | String     | Return topics a target member is subscribed to
| name       | String     | Return topics that match the specified name (e.g. 'Digital Photography', 'Classical Music')
| topic      | String     | Return topics for this topic urlkey
| search     | String     | Return topics related to a list of search terms [separate search keywords with +'s]

## Meetup.getOpenEvents
Searches for recent and upcoming public events hosted by Meetup groups. Its search window  is the past one month through the next three months, and is subject to change. Open Events is optimized to search for current events by location, category, topic, or text, and only lists Meetups that have **3 or more RSVPs**. The number or results returned with each request is not guaranteed to be the same as the page size due to secondary filtering. If you're looking for a particular event or events within a particular group, use the standard [Events](http://meetup.com/meetup_api/docs/2/events/) method.

| Field        | Type       | Description
|--------------|------------|----------
| accessToken  | credentials| Required: OAuth2 Access Token
| andText      | String     | Changes the interpretation of the "text" field from OR'd terms to AND'd terms
| latitude     | String     | Recomended: A valid latitude, limits the returned group events to those within radius miles
| zip          | String     | Recomended: A valid US zip code, limits the returned groups to those within radius miles
| country      | String     | Recomended: A valid country code
| topic        | String     | Recomended: Return events in the specified topic or topics specified by commas. This is the topic "urlkey" returned by the Topics method. If all supplied topics are unknown, a 400 error response is returned with the code "badtopic".
| city         | String     | Recomended: A valid city
| limitedEvents| String     | Include limited event information for private groups that wish to expose only a small amount of information about their events. This includes just: id, name, utc_offset, time, duration, yes_rsvp_count, waitlist_count, group, visibility, timezone. Value must be true or false.
| textFormat   | String     | Format of the description text, "html" or "plain". Defaults to "html"
| state        | String     | Recomended: If searching in a country with states, a valid 2 character state code
| text         | String     | Recomended: Events that contain the given term or terms somewhere in their content. The terms are OR'd by default. Separate terms with " AND " for events that have combined terms. To have terms automatically AND'd, set the "and_text" to true
| category     | String     | Recomended: Return events in the specified category or categories specified by commas. This is the category id returned by the Categories method.
| longitude    | String     | Recomended: A valid longitude, limits the returned group events to those within radius miles
| time         | String     | Return events scheduled within the given time range, defined by two times separated with a single comma. Each end of the range may be specified with relative dates, such as "1m" for one month from now, or by absolute time in milliseconds since the epoch. If an endpoint is omitted, the range is unbounded on that end. The default value is unbounded on both ends (though restricted to the search window described above). Note: to retrieve past events you must also update status value
| radius       | String     | Radius, in miles for geographic requests, default 25.0 -- maximum 100. May also be specified as "smart", a dynamic radius based on the number of active groups in the area
| fields       | String     | Request that additional fields (separated by commas) be included in the output
| status       | String     | Status may be "upcoming", "past" or both separated by a comma. The default is "upcoming" only

## Meetup.getConcierge
Recommends upcoming meetups for the authorized member in a given location and in thier groups

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| zip        | String     | A valid US zip code, limits the returned groups to those within radius miles
| country    | String     | A valid country code
| city       | String     | A valid city
| longitude  | String     | A valid longitude, limits the returned group events to those within radius miles
| textFormat | String     | Format of the description text, "html", "plain", or "simplehtml". Defaults to "html"
| categoryId | String     | Comma delimited list of category ids to limit recommendations to
| pageToken  | String     | An opaque string used to page through results. This can be found appended to the 'next' link in the meta section of the response.
| state      | String     | If searching in a country with states, a valid 2 character state code
| time       | String     | Return events scheduled within the given time range, defined by two times separated with a single comma. Each end of the range may be specified with relative dates, such as "1m" for one month from now, or by absolute time in milliseconds since the epoch. If an endpoint is omitted, the range is unbounded on that end. The default value is unbounded on both ends (though restricted to the search window described above). Note: to retrieve past events you must also update status value
| topicId    | String     | Comma delimited list of topics to help inform recommendation
| radius     | String     | Radius, in miles for geographic requests, defaults to the member's preferred radius or 0.5 -- maximum 100. May also be specified as "smart", a dynamic radius based on the number of active groups in the area
| fields     | String     | Request that additional fields (separated by commas) be included in the output
| withFriends| String     | Boolean parameter. When set to true, events hosted by groups you have friends in will be recommended
| selfGroups | String     | set to "include" or "exclude" groups the authorized member belongs to. The default is "include". This includes groups in locations that may differ than the provided location
| latitude   | String     | A valid latitude, limits the returned group events to those within radius miles

## Meetup.getGroups
Fetch information about Meetup Groups.

| Field       | Type       | Description
|-------------|------------|----------
| accessToken | credentials| Required: OAuth2 Access Token
| groupNum    | String     | Return the group with this topic and number
| topic       | String     | Recomended: Return the group with this topic and number
| zip         | String     | Recomended: A valid US zip code, limits the returned groups to those within radius miles.
| longitude   | String     | A valid latitude and longitude, limits the returned groups to those within radius miles
| latitude    | String     | Recomended: A valid latitude and longitude, limits the returned groups to those within radius miles
| groupUrlName| String     | Recomended: one or more separated by commas, includes no slashes
| topic       | String     | Recomended: Only return groups in the specified topic [one topic allowed]
| groupId     | String     | Recomended: one or more separated by commas
| organizerId | String     | Recomended: one or more organizer IDs, separated by commas
| domain      | String     | Recomended: one or more custom group domains, separated by commas
| memberId    | String     | Recomended: one or more separated by commas, for groups this member belongs to
| radius      | String     | Radius, in miles for geographic requests, default 25 -- maximum 100
| fields      | String     | optional result fields, separated by commas.
| categoryId  | String     | Recomended: Only return groups in the specified category. [one category allowed]
| state       | String     | A valid country code, city and for the US, State. limits the returned groups to those within radius miles
| city        | String     | A valid country code, city and for the US, State. limits the returned groups to those within radius miles
| country     | String     | Recomended: A valid country code, city and for the US, State. limits the returned groups to those within radius miles

## Meetup.getEvents
Access Meetup events using a group, member, or event id. Events in private groups are available only to authenticated members of those groups. To search events by topic or location, see [Open Events](http://meetup.com/meetup_api/docs/2/open_events).

| Field        | Type       | Description
|--------------|------------|----------
| accessToken  | credentials| Required: OAuth2 Access Token
| rsvp         | String     | Recomended: Filters events by the currently authenticated member's RSVP status. May be a comma delimited list of "yes", "no", "waitlist", "maybe" or "none"
| groupUrlName | String     | Recomended: Path to group from meetup.com, no slashes
| eventId      | String     | Recomended: Multiple ids may be separated with commas
| groupId      | String     | Recomended: Multiple ids may be separated with commas
| limitedEvents| String     | Include limited event information for private groups that wish to expose only a small amount of information about their events. This includes just: id, name, utc_offset, time, duration, yes_rsvp_count, waitlist_count, group, visibility, timezone. Value must be true or false.
| textFormat   | String     | Format of the description text, "html" or "plain". Defaults to "html"
| groupDomain  | String     | Recomended: Group custom domain
| venueId      | String     | Recomended: Multiple ids may be separated with commas
| memberId     | String     | Recomended: Single member id, to find events in this member's groups
| time         | String     | Return events scheduled within the given time range, defined by two times separated with a single comma. Each end of the range may be specified with relative dates, such as "1m" for one month from now, or by absolute time in milliseconds since the epoch. If an endpoint is omitted, the range is unbounded on that end. The default value is unbounded on both ends (though restricted to the search window described above). Note: to retrieve past events you must also update status value
| fields       | String     | Request that additional fields (separated by commas) be included in the output
| status       | String     | Status may be "upcoming", "past", "proposed", "suggested", "cancelled", "draft" or multiple separated by a comma. The default is "upcoming", which includes Meetups that are happening now according to their **duration**. Meetups that are "proposed" or "suggested" do not have a date assigned; the former are listed on the site as <i>official</i> while the latter appear as <i>in the making</i>. Drafts are only visible to organizers of groups hosting the events.

## Meetup.postEvent
Method description

| Field                | Type       | Description
|----------------------|------------|----------
| accessToken          | credentials| Required: OAuth2 Access Token
| rsvpLimit            | String     | Total number of RSVPs available for the event
| rsvpOpen             | String     | Users with permission may set the RSVP open time for the event. The time may be specified in milliseconds since the epoch, or relative to the current time in the d/w/m format.
| venueVisibility      | String     | Controls the visibility of the event venue for non members of the hosting group. May be one of "public" or "members"
| hosts                | String     | Up to 5 comma-separated valid member ids to be hosts for the event. If hosts is not provided, the authorized member is the default host
| addNewQuestions      | JSON       | Those with permission may include up to 6 survey questions for the event with each being up to 250 characters. See the parameter notes section for more information. See postEvent README for more details.
| groupUrlName         | String     | Recomended: URL name of the Group hosting the event
| why                  | String     | We should do this because... May not be longer than 250 characters.
| description          | String     | Longer description of the event, in HTML. May not be longer than 50000 characters.
| howToFindUs          | String     | The information provided by the event host for "How will members find you there?". Visible when location is visible to the authenticated member
| groupId              | String     | Recomended: Group hosting the event
| rsvpClose            | String     | Users with permission may set the RSVP close time for the event. The time may be specified in milliseconds since the epoch, or relative to the current time in the d/w/m format.
| duration             | String     | Event duration in milliseconds. When not specified, a default of 3 hours may be assumed by applications. To clear event duration, set this to 0
| name                 | String     | Recomended: Name of the event. May not be longer than 80 characters.
| guestLimit           | String     | Number of guests members may include in their RSVP, 0 or more
| simpleHtmlDescription| String     | Description of the event, in simple HTML format. This value is translated to HTML to update the description. May not be longer than 50000 characters.
| time                 | String     | Event start time in milliseconds since the epoch, or relative to the current time in the d/w/m format.
| venueId              | String     | Numeric identifier of a venue
| publishStatus        | String     | If you are an organizer of the group, you may set this to "draft" to save the event as a draft. Doing so will require a status=draft filter on /2/event queries.

### addNewQuestions format:

Key: question index

Value: question text

```json
{
	"0": "Test question",
	"12": "Test question2"
}
```

## Meetup.editEvent
Update an existing Meetup

| Field                | Type       | Description
|----------------------|------------|----------
| accessToken          | credentials| Required: OAuth2 Access Token
| id                   | String     | Required: Event id.
| longitude            | String     | Updates to the venue's latitude and longitude. When present, both must be provided
| latitude             | String     | Updates to the venue's latitude and longitude. When present, both must be provided
| rsvpLimit            | String     | Total number of RSVPs available for the event. To remove this limit, set this to 0
| rsvpOpen             | String     | Users with permission may set the RSVP open time for the event. The time may be specified in milliseconds since the epoch, or relative to the current time in the d/w/m format.
| venueVisibility      | String     | Controls the visibility of venue. May be one of "public" or "members"
| hosts                | String     | Up to 5 valid member ids to be hosts for the event.
| addNewQuestions      | JSON       | Those with permission may include up to 6 survey questions with each being up to 250 characters, including edited questions, for the event. See the parameter notes section for more information. See editEvent README for more details.
| why                  | String     | We should do this because... May not be longer than 250 characters.
| description          | String     | Longer description of the event, in HTML. May not be longer than 50000 characters.
| howToFindUs          | String     | The information provided by the event host for "How will members find you there?". Visible when location is visible to the authenticated member
| rsvpClose            | String     | Users with permission may set the RSVP close time for the event. The time may be specified in milliseconds since the epoch, or relative to the current time in the d/w/m format. To unset rsvp_close, set this to 0
| announce             | String     | Organizers and hosts may set this to true to announce a Meetup.
| duration             | String     | Event duration in milliseconds. When not specified, a default of 3 hours may be assumed by applications. To clear event duration, set this to 0
| groupId              | String     | Group to hold the event
| name                 | String     | Event name. May not be longer than 80 characters.
| guestLimit           | String     | number of guests members may include in their RSVP, 0 or more
| simpleHtmlDescription| String     | Description of the event, in simple HTML format. This value is translated to HTML to update the description. May not be longer than 50000 characters.
| time                 | String     | event start time in milliseconds since the epoch, or relative to the current time in the d/w/m format.
| editQuestions        | JSON       | Those with permission may include up to 6 survey questions with each being up to 250 characters, including new questions. To delete a question submit this parameter with an empty value. See editEvent README for more details.
| venueId              | String     | Numeric identifier of a venue. To unset the event's venue, set this to 0
| publishStatus        | String     | If you are an organizer of the group, you may set this to "draft" or "published". Setting state to "draft" will require a status=draft filter on /2/event queries.

### addNewQuestions and editQuestions format:

Key: question index
Value: question text

```json
{
	"0": "Test question",
	"12": "Test question2"
}
```

## Meetup.deleteEvent
Deletes a specified meetup

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| id         | String     | Required: Event id.

## Meetup.getCities
Returns Meetup cities. This method supports search by latitude/longitude/radius, by country/state, by query term/zip, or a combination of all of these. Location-only searches by lat and lon return all cities within a radius of the provided coordinates. Searches with a query return up to 10 cities matching the term, and can be sorted by size or distance to a given coordinate. 'smart' ordering can be used to return the match(es) with the highest member_count, unless a smaller size match exists nearby the given coordinates. Query searches are supported for country but not country and state

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| country    | String     | A valid country code
| query      | String     | Search term and/or zip to look for (if this is specified, max result size limited to 10)
| longitude  | String     | Longitude to search
| state      | String     | A valid state code for the given country, if the country has states
| radius     | String     | When searching by lat/lon only, specify a radius to search (default 50 miles)
| latitude   | String     | Latitude to search

## Meetup.getMembers
API method for accessing members of Meetup Groups

| Field       | Type       | Description
|-------------|------------|----------
| accessToken | credentials| Required: OAuth2 Access Token
| groupNum    | String     | Return members for the group with given topic and number
| topic       | String     | Recomended: Return members for the group with given topic and number
| groupUrlName| String     | Recomended: Return members for the group with the given custom URL path
| memberId    | String     | Recomended: Return the member with this ID
| fields      | String     | Request that additional fields (separated by commas) be included in the output.
| groupId     | String     | Recomended: Return members in groups with these ID numbers, separated by commas
| service     | String     | Recomended: Match users by the external services they've linked to their member account, specified as "servicename:identifier". For example, "service=twitter:@MeetupAPI" finds any member account that lists @MeetupAPI as its Twitter name (none, currently). You can query against several at a time by separating them with commas. Facebook identifiers should be provided as numeric values

## Meetup.getSingleMember
Retrieve a single member

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| id         | String     | Required: member id.
| fields     | String     | comma-separate list of optional fields

## Meetup.editSignleMember
Edit the authorized member's attributes

| Field          | Type       | Description
|----------------|------------|----------
| accessToken    | credentials| Required: OAuth2 Access Token
| id             | String     | Required: member id.
| birthday       | String     | Day you were born. Format should be in the form of yyyy or mmddyyyy. A value of -1 indicates that birthday data should be cleared.
| zip            | String     | Valid zip code for city
| country        | String     | Valid country code for your location
| hometown       | String     | Hometown of member. Can not be longer than 64 characters
| removeTopics   | String     | Comma-delimited list of topic ids to remove from your alert list
| gender         | String     | Your gender (used for better recommendations). Value may be one of other, none, female, male
| photoId        | String     | A valid photo_id from the member's photos to set as the main profile photo. A value of 0 will unset the current photo
| city           | String     | City name for your location
| topicsPrivacy  | String     | Controls the visibility of the member's topics. May be one of visible, hidden
| facebookPrivacy| String     | Controls the visibility of the member's facebook connection. May be one of visible, hidden. If the member has not connected their Facebook account, attempts to set this preference will do nothing.
| bio            | String     | Free form text passage about you. must be less than 250 characters
| longitude      | String     | longitude of city
| groupsPrivacy  | String     | Controls the visibility of the member's groups. May be one of visible, hidden
| addTopics      | String     | Comma-delimited list of topics ids to add to your alert list
| syncPhoto      | String     | When set to true, this parameter will sync all of the group profile photos for the member with the provided photo_id
| name           | String     | The name of the current member
| bioPrivacy     | String     | Controls the visibility of the member's bio. May be one of visible, hidden
| photosPrivacy  | String     | Controls the visibility of the member's photos. May be one of visible, hidden
| lang           | String     | Language preference used on the site. Valid values are en-us, en-au, de-de, es, es-es, fr-fr, it-it, pt-br, ja-jp, ko-kr, nl-nl, en_us, en_au, de_de, es, es_es, fr_fr, it_it, pt_br, ja_jp, ko_kr, nl_nl, en, en, de, es, es, fr, it, pt, ja, ko, nl
| radius         | String     | radius, in miles to search for city given a lat and lon. default 25.0, max 100.0
| latitude       | String     | latitude of city
| messagingPref  | String     | This specifies the member's preference for being contacted from members on the site. Possible values are "orgs_only" meaning only group organizers can contact you, "groups_only" meaning only members of your group can contact you, or "all_members" meaning all members may contact you.
| cityId         | String     | Valid city id from /2/cities method

## Meetup.getProfiles
This method returns member *profiles* associated with a particular group. Meetup members have separate profiles for each group they join.

| Field       | Type       | Description
|-------------|------------|----------
| accessToken | credentials| Required: OAuth2 Access Token
| groupNum    | String     | Group identification by topic, deprecated
| topic       | String     | Recomended: Group identification by topic, deprecated
| role        | String     | if "leads", only profiles for members of the leadership team are included
| groupUrlName| String     | Recomended: Return profiles for the group with the given custom URL path
| memberId    | String     | Recomended: Return the profiles for members with these IDs, separated by commas
| fields      | String     | comma delimited list of optional response properties. A value of "membership_dues" will populate membership dues for the authorized user or members of the groups the authorized user organizes
| groupId     | String     | Recomended: Return profiles in the group with this ID
| status      | String     | Status filter for members. Only organizers may see pending. Request must also contain a `group_id` or `group_urlname`. Status may be one of active, pending

## Meetup.postProfile
This method allows an authenticated member to join a group by creating a profile

| Field        | Type       | Description
|--------------|------------|----------
| accessToken  | credentials| Required: OAuth2 Access Token
| siteName     | String     | Name of member's site. Max length is 32
| photoId      | String     | photo_id of the photo to use for this profile
| siteUrl      | String     | Link to member's site. Max length is 80
| groupUrlName | String     | Recomended: Urlname of group to join
| intro        | String     | Provides a Member an opportunity to tell the group about themselves
| newPhoto     | String     | file upload for a new member photo
| groupId      | String     | Recomended: Id of group to join
| provideAnswer| JSON       | Answers to questions from groups API join_info question fields

### provideAnswer format:

Key: question index

Value: question text

```json
{
	"0": "Test question",
	"12": "Test question2"
}
```

## Meetup.editProfile
Update a member's group profile

| Field        | Type       | Description
|--------------|------------|----------
| accessToken  | credentials| Required: OAuth2 Access Token
| groupId      | String     | Required: Group Id
| memberId     | String     | Required: Memeber Id
| siteName     | String     | Name of member's site. Max length is 32
| addRole      | String     | Allows those with permission to assign one of the following roles: coorganizer, event_organizer, assistant_organizer
| photoId      | String     | photo_id of the photo to use for this profile. set to 0 to unset the current photo
| siteUrl      | String     | Link to member's site. Max length is 80
| intro        | String     | Provides a Member an opportunity to tell the group about themselves
| newPhoto     | String     | file upload for a new member photo
| title        | String     | An organizer-defined member title.
| removeRole   | String     | Allows those with permission to remove one of the following roles: coorganizer, event_organizer, assistant_organizer
| provideAnswer| JSON       | Answers to questions from groups API join_info question fields

### provideAnswer format:

Key: question index

Value: question text

```json
{
	"0": "Test question",
	"12": "Test question2"
}
```

## Meetup.getSingleProfile
Retrieves a single group profile

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| groupId    | String     | Required: Group Id
| memberId   | String     | Required: Memeber Id
| fields     | String     | Request that additional fields (separated by commas) be included in the output

## Meetup.deleteProfile
Deletes a member's group profile

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| groupId    | String     | Required: Group Id
| memberId   | String     | Required: Memeber Id
| exitComment| String     | Optional message to the organizer when leaving

## Meetup.deletePhoto
Deletes a specified event photo

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| id         | String     | Required: Photo id

## Meetup.deleteMemberPhoto
Delete the specified member photo

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| id         | String     | Required: Photo id

## Meetup.getGroupComments
API method for accessing meetup group comments

| Field       | Type       | Description
|-------------|------------|----------
| accessToken | credentials| Required: OAuth2 Access Token
| groupNum    | String     | Return comments for the group with given topic and number
| topic       | String     | Recomended: Return comments for the group with given topic and number
| groupId     | String     | Recomended: Return comments in groups with these ID numbers [separated by commas]
| groupUrlName| String     | Recomended: Return comments for the group with this custom URL path

## Meetup.getEventComments
This method returns messages that appear under "Talk about this Meetup". To post messages, see the corresponding write method.

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| commentId  | String     | Recomended: Return comments for a given set of comment IDs, separated by commas
| memberId   | String     | Recomended: Return comments for the given member_ids, separated by commas
| fields     | String     | Optionally accepts the value "member_photo" or "notifications"
| groupId    | String     | Recomended: Return comments in groups with these ID numbers, separated by commas
| eventId    | String     | Recomended: Return comments on these events, separated by commas.

## Meetup.postEventComment
This method posts messages that appear under "Talk about this Meetup".

| Field        | Type       | Description
|--------------|------------|----------
| accessToken  | credentials| Required: OAuth2 Access Token
| comment      | String     | Recomended: The comment text
| inReplyTo    | String     | Recomended: If this comment is a reply, the ID of the comment being replied to
| notifications| String     | Notification control for authorized member on this comment thread. "on" will result in notifications being sent. "off" will opt the member out of notifications for this comment thread. Defaults to "on" unless the member previous opted out of notifications on the thread.
| eventId      | String     | Recomended: The event related to this comment.

## Meetup.getSingleEventComment
Retrieve a single event comment or reply

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| id         | String     | Required: Comment id
| fields     | String     | comma-separate list of optional fields

## Meetup.deleteEventComment
Delete a single event comment or reply

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| id         | String     | Required: Comment id
| fields     | String     | comma-separate list of optional fields

## Meetup.postEventCommentFlag
This method creates a spam report for comment content

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| commentId  | String     | Recomended: The id of the comment
| reason     | String     | Reason for flagging the comment. May be one of inappropriate, spam

## Meetup.deleteEventCommentSubscribe
Unsubscribe to notifications for updates to a given comment thread

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| id         | String     | Required: Comment id

## Meetup.postEventCommentSubscribe
Subscribe to notifications on updates to a given comment thread

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| id         | String     | Required: Comment id

## Meetup.postEventCommentLike
Like a given Event comment

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| id         | String     | Required: Comment id

## Meetup.deleteEventCommentLike
Unlike a given Event comment

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| id         | String     | Required: Required: Comment id

## Meetup.getEventCommentLikes
Api for listing likes of a given event comment

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| commentId  | String     | Recomended: Return likes for a given comment_id

## Meetup.getPhotoComments
This method returns comments on meetup photos. To post messages, see the corresponding write method

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| memberId   | String     | Return comments for the given member_ids, separated by commas. The member ids must match up with one of the provided photo ids
| photoId    | String     | Recomended: Return comments on these photos, separated by commas
| fields     | String     | Request that additional fields (separated by commas) be included in the output.

## Meetup.postPhotoComment
This method posts comments that appear below photos

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| photoId    | String     | Recomended: The photo related to this comment.
| comment    | String     | Recomended: The comment text

## Meetup.getEventRatings
API method for accessing Meetup comments

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| memberId   | String     | The ID of a member to filter ratings on
| eventId    | String     | Recomended: The ID of the event to fetch ratings data for

## Meetup.postEventRating
This method allows members to posts rating for an event after it's occurred. Only permitted for members who rsvp'd "yes" or "maybe" to the event

| Field        | Type       | Description
|--------------|------------|----------
| accessToken  | credentials| Required: OAuth2 Access Token
| attendeeCount| String     | DEPRECATED: The number of attendees for the event (organizers/assistant organizers/co-organizers/event organizers/event hosts only)
| rating       | String     | Recomended: The member's rating (either 1, 2, 3, 4, or 5)
| eventId      | String     | Recomended: The ID of the event to fetch ratings data for

## Meetup.getPhotoAlbums
This method returns photo albums associated with Meetup groups. To create albums, see the corresponding write method.

| Field       | Type       | Description
|-------------|------------|----------
| accessToken | credentials| Required: OAuth2 Access Token
| photoAlbumId| String     | Recomended: Return albums with these IDs, separated by commas
| groupId     | String     | Recomended: Return albums in groups with these ID, separated by commas
| eventId     | String     | Recomended: Return photo albums for these event ids, separated by commas

## Meetup.postPhotoAlbum
This method creates photo albums within a Meetup group

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| groupId    | String     | Recomended: Group to create the album in
| title      | String     | Recomended:  Title of the new album

## Meetup.getOpenVenues
Searches for public venues within a given geo space. To search for specific venues that your group has used, use the [Venues](http://meetup.com/meetup_api/docs/2/venues) method

| Field       | Type       | Description
|-------------|------------|----------
| accessToken | credentials| Required: OAuth2 Access Token
| latitude    | String     | Recomended: A valid latitude, limits the returned venues to those within radius miles
| state       | String     | Recomended: For the US, a valid 2 character state code
| text        | String     | Recomended: Venues that contain the given term or terms somewhere in their content. Separate terms with " AND " for venues that have combined terms. Append a trailing * to treat this as a prefix search
| zip         | String     | Recomended: A valid US zip code, limits the returned venues to those within radius miles
| country     | String     | Recomended: A valid country code.
| longitude   | String     | Recomended: A valid longitude, limits the returned venues to those within radius miles
| groupUrlName| String     | Recomended: Returns venues with location relative to the group associated with this urlname
| city        | String     | Recomended: A valid city
| radius      | String     | Radius, in miles for geographic requests, default 25.0 -- maximum 100.0
| fields      | String     | Request that additional fields (separated by commas) be included in the output

## Meetup.getVenues
Search for Meetup venues by one of your groups, events, or venue identifiers. For a full text search on public venues use [OpenVenues](http://meetup.com/meetup_api/docs/2/open_venues).

| Field       | Type       | Description
|-------------|------------|----------
| accessToken | credentials| Required: OAuth2 Access Token
| venueId     | String     | Recomended: multiple ids may be separated with commas
| fields      | String     | Request that additional fields (separated by commas) be included in the output
| groupId     | String     | Recomended: multiple ids may be separated with commas
| groupUrlName| String     | Recomended: path to group from meetup.com, no slashes
| eventId     | String     | Recomended: multiple ids may be separated with commas

## Meetup.getRSVPs
Query for Event RSVPs by event

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| fields     | String     | Parameter for requesting optional response properties, set to other_services for a list of third party services
| rsvp       | String     | Filters response on RSVP status. "yes" if member RSVP'd yes otherwise "no"
| eventId    | String     | Recomended: Multiple alphanumeric ids may be separated with commas

## Meetup.postRSVP
Creates or updates an existing RSVP

| Field        | Type       | Description
|--------------|------------|----------
| accessToken  | credentials| Required: OAuth2 Access Token
| rsvp         | String     | Recomended: The RSVP setting - value must be either "yes", "no" or "waitlist"
| memberId     | String     |  Organizers and event hosts may RSVP on behalf of a member by specifying an ID here. As when editing RSVPs on the site, organizers may enter a "yes" for a member even if the event requires payment.
| comments     | String     | A comment to post along with the RSVP
| eventId      | String     | Recomended: The event that you are RSVP'ing to
| guests       | String     | Number of guests also coming to the event.
| optionToPay  | String     | For events with fees, the authorized member may opt to pay as part of the RSVP request. This may be set to true or false
| provideAnswer| JSON       | Answers to event survey questions. Answers may not be longer than 250 characters. Organizers and hosts my not edit or create answers on behalf of members
| agreeToRefund| String     | For events with fees, the authorized member must agree to the event's refund policy. This must be set to either true or false

### provideAnswer format:

Key: question index

Value: question text

```json
{
	"0": "Test question",
	"12": "Test question2"
}
```

## Meetup.getSingleRSVP
Retrieve a single RSVP

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| id         | String     | Required: RSVP id
| fields     | String     | Request that additional fields (separated by commas) be included in the output

## Meetup.postGroupPhoto
Uploads a new Meetup Group photo. To change other Group settings use the [Group Edit](http://meetup.com/meetup_api/docs/:urlname/#edit) endpoint

| Field       | Type       | Description
|-------------|------------|----------
| accessToken | credentials| Required: OAuth2 Access Token
| await       | String     | If true, this ensures a response will not be returned until the upload is accessible
| main        | String     | Set to 'true' to have this photo become the group's main photo. Set it to 'false' otherwise. Defaults to true
| groupId     | String     | Recomended: Group ID for the target group. This may be used as an alternative to group_urlname
| photo       | String     | Recomended: The photo, encoded as multipart/form-data. The maximum file size allowed is 10MB
| groupUrlName| String     | Recomended: Group urlname. This may be used as an alternative to group_id

## Meetup.postMemberPhoto
Uploads a photo to be associated with a Member

| Field            | Type       | Description
|------------------|------------|----------
| accessToken      | credentials| Required: OAuth2 Access Token
| await            | String     | If true, this ensures a response will not be returned until the upload is accessible
| main             | String     | Set to "true" to have this photo become the member's main profile photo. Otherwise, it will become the main photo only when none other is selected. If the authenticated member does not already have a main profile photo set it will remain so.
| syncMatchingPhoto| String     | When set to true and main is set to true, this will replace all group profile photos matching the current photo with the provided replacement
| photo            | String     | Recomended: The photo, encoded as multipart/form-data. The maximum file size allowed is 10MB
| syncPhoto        | String     | When set to true, this parameter will sync all of the group profile photos for the member with the provided photo_id

## Meetup.postPhoto
Uploads a photo for a given event

| Field       | Type       | Description
|-------------|------------|----------
| accessToken | credentials| Required: OAuth2 Access Token
| await       | String     | If true, this ensures a response will not be returned until the upload is accessible
| caption     | String     | Caption for the photo
| photoAlbumId| String     | Recomended: Identifier of an existing photo album, which may be an event or group album
| photo       | String     | Recomended: The photo, encoded as multipart/form-data. The maximum file size allowed is 10MB
| eventId     | String     | Recomended: Identifier of an event. If there is no album for this event, one will be created.

## Meetup.getActivity
API method for retrieving the activity feed for a member's groups

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| memberId   | String     | Returns activity from this member's groups. Must be authenticated as this member
| pageStart  | String     | Starting timestamp for item to return.

## Meetup.getOEMBed
oEmbed implementation

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| url        | String     | Recomended: url of resource to be embedded
| maxWidth   | String     | maximum width to display

## Meetup.getStatus
Returns the current API service status

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token

## Meetup.membershipApproval
Approves one or more requests for group membership

| Field         | Type       | Description
|---------------|------------|----------
| accessToken   | credentials| Required: OAuth2 Access Token
| urlname       | String     | Required: Group url name.
| member        | String     | Comma-delimited numeric pending member IDs. The maximum allowed is 200
| welcomeMessage| String     | Optional message to send to the members being approved. If not provided, the groups default welcome message will be sent. Max message size is 2000
| sendCopy      | String     | Optional boolean value indicating whether or not the org should receive a copy of the message sent to the approved members

## Meetup.getEventAttendance
Lists attendance records for Meetup events. Limited for use by administrative members.

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| urlname    | String     | Required: Group url name.
| id         | String     | Required: Event id
| filter     | String     | A named filter to apply to the attendance list. These are roughly equivalent to the set of filters you will see in the attendance tool on the site. These filters correspond with attendance records as well as each member's original RSVP status. The filter value be one of: legacy, maybe, waitlist, yes, absent, all, attended, noshow, excused, relevant, no. The default is 'attended'. The 'absent' filter represents all members not in attendance including members with a 'noshow' status. An 'excused' absence is an absent member marked as such by an administrative member
| member     | String     | Raw text used to search for member by name. This may only be applied when the filter parameter is set to 'all'. The provided text must consist of at least 2 characters.

## Meetup.takeEventAttendance
Takes member attendance for an event. Limited for use by administrative members.

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| urlname    | String     | Required: Group url name.
| id         | String     | Required: Event id.
| guests     | String     | The number of guests accompanying member. Maximum of 99 is allowed. When providing multiple values in the `member` field, this value is ignored
| headCount  | String     | Sets the overall headcount for the event. This may not necessarily correlate with the list of attendees in this group if the event is part of a joint Meetup event. When providing multiple values in the `member` field, this value is ignored
| member     | String     | Recomended: A comma-delimited list of valid ids associated with members RSVP'd to the event
| status     | String     | Recomended: An attendance status for the provided members. Must be one of: noshow, absent, attended

## Meetup.getBoards
Listings of Group discussion boards

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| urlname    | String     | Required: Group url name.

## Meetup.membershipDecline
Declines one or more requests for group membership

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| urlname    | String     | Required: Group url name.
| member     | String     | Comma-delimited numeric pending member IDs. The maximum allowed is 200
| anonymous  | String     | Optional Boolean value indicating whether the declining member's email address should be hidden in the resulting response. Default is true.
| sendCopy   | String     | Optional Boolean value indicating whether or not to send a copy to the member issuing the decline. Default is false
| explanation| String     | Optional explanation to send to the members being declined. Max message size is 2000
| ban        | String     | Optional Boolean value indicating whether or not to ban the member in the future. Default is false

## Meetup.getDiscussions
Listings of group discussions

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| urlname    | String     | Required: Group url name.
| boardId    | String     | Required: Board ID

## Meetup.getSingleDiscussion
Listing Group discussion posts

| Field       | Type       | Description
|-------------|------------|----------
| accessToken | credentials| Required: OAuth2 Access Token
| urlname     | String     | Required: Group url name.
| boardId     | String     | Required: Board ID
| discussionId| String     | Required: Discussion ID

## Meetup.getSelfEvents
Gets a listing of all scheduled Meetup Events the authenticated member has RSVP'd to
that have been announced to the group.
This listing is ordered from oldest to most recent by default

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| scroll     | String     | A string representing a scroll target.

Supported values are as follows.

__recent_past__: Scroll to the last RSVP'd Meetup Event that has passed.
 If there is no recent RSVP, this defaults to __next_upcoming__

__next_upcoming__: Scroll to the next upcoming Meetup Event the authenticated member
RSVP'd to.

Alternatively the server may generate a scroll value used for pagination Link headers.
Clients should treat the contents of those as a transparent string. Its
contents are subject to change in the future
| page       | String     | Number of results to return. Defaults to 200.
| fields     | String     | A comma-delimited list of optional fields names which may be appended to the response
| rsvp       | String     | Comma-delimited list of RSVP responses.
Valid values are "waitlist" or "yes". The default is "yes"
| desc       | String     | When true, sorts results in descending order. Defaults to false
| status     | String     | Comma-delimited list of event statuses.
Valid values are "past" or "upcoming"

## Meetup.getSingleEvent
Fetches a Meetup Event by group urlname and event_id

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| urlname    | String     | Required: Group url name.
| id         | String     | Required: Event id
| fields     | String     | A comma-delimited list of optional fields to append to the response

## Meetup.postEventPayments
Allows organizers of a group to note payments made by members for an event. This is the 'Mark Paid' feature seen in the RSVP listings on event details pages and affects the 'pay_status' response fields in [2/rsvps](http://meetup.com/meetup_api/docs/2/rsvps/#response) for paid events

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| urlname    | String     | Required: Group url name.
| id         | String     | Required: Event id
| amount     | String     | Recomended: The monetary amount of money the member submitted
| quantity   | String     | The number of payments made. Defaults to 1
| member     | String     | Recomended: Member Id of member who made a payment
| paidOn     | String     | The time the payment was made in milliseconds from the epoc. Defaults to now

## Meetup.findGroups
Text, location, category and friend-based group searches

| Field              | Type       | Description
|--------------------|------------|----------
| accessToken        | credentials| Required: OAuth2 Access Token
| zip                | String     | Zipcode of location to limit search to
| country            | String     | A valid two character country code, defaults to US
| upcomingEvents     | String     | If true, filters text and category based searches on groups that have upcoming events. Defaults to false
| longitude          | String     | Approximate longitude
| filter             | String     | Determines which groups are returned. If 'all' (default), the text and category parameters are applied. If 'friends', groups your friends are in are returned. The value of this parameter may be one of all, friends
| fallbackSuggestions| String     | boolean indicator of whether or not to return a list of curated suggestions for groups if we can't find groups matching your criteria
| location           | String     | Raw text location query
| text               | String     | Raw full text search query
| topicId            | String     | Comma-delimited list of numeric topic ids
| radius             | String     | Radius in miles. May be 0.0-100.0, 'global' or 'smart', a dynamic radius based on the number of active groups in the area. Defaults to member's preferred radius
| fields             | String     | Request that additional fields (separated by commas) be included in the output.
| category           | String     | Comma-delimited list of numeric category ids
| selfGroups         | String     | set to 'include' or 'exclude' Meetups the authorized member belongs to; default is 'include'
| latitude           | String     | Approximate latitude

## Meetup.getSingleGroup
Fetches a Meetup group by urlname

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| urlname    | String     | Required: Group url name.
| fields     | String     | A comma-delimited list of optional fields to append to the response

## Meetup.editGroup
Allows organizers to edit their Meetup group information. To change group topics, see the [add](http://meetup.com/meetup_api/docs/:urlname/topics/#add) and [remove](http://meetup.com/meetup_api/docs/:urlname/topics/#remove) topics endpoints. To change group photo use the [Group photo upload](http://meetup.com/meetup_api/docs/2/group_photo/#create) endpoint. OAuth authenticated requests require an additional [group_edit](http://meetup.com/meetup_api/auth/#oauth2-scopes) permission.

| Field          | Type       | Description
|----------------|------------|----------
| accessToken    | credentials| Required: OAuth2 Access Token
| urlname        | String     | Required: Group url name.
| zip            | String     | The ZIP code of the city
| country        | String     | The ISO_3166-1 country code for the country which contains the city
| listMode       | String     | Defines policy for who can post to the group mailing list. May be one of 'open' meaning any member can post, 'off' meaning no one can post, 'moderated' meaning messages must be approved, or 'orgs_only' meaning only organizers may post to the list
| dryrun         | String     | Boolean parameter that will cause this endpoint to apply all validation rules without actually saving changes in which case the response will only reflect the group's current attributes
| gaCode         | String     | Google Analytics code for group
| removeTopics   | String     | Comma-delimited list of topic ids to disassociate with group
| visibility     | String     | Restricts group visibility for non-members. May be one of 'public', 'public_limited' or 'members'. Note, the 'members' option is only available to groups that already have 'members' visibility
| addNewQuestions| JSON       | A new profile question defined in the order of index provided in the request parameter name. See editGroup README for more details.
| keyPhoto       | String     | Group's primary photo. Must be ID of an existing album photo
| photoReq       | String     | Indicates that a member must provide a photo before joining. Expects true or false values
| description    | String     | Summary of what the Meetup group is about in simple HTML format
| questionsReq   | String     | Indicates that provided questions are required before joining. Expects true or false values
| welcomeMessage | String     | Message sent to members after they join. Can be at most 2000 characters
| joinMode       | String     | Controls how member's are let into the group. May be one of 'open' meaning any Meetup member my join, 'closed' meaning group is not currently accepting new members, or 'approval' meaning members must be approved by an organizer. Note, the 'closed' options is only available to groups that already have a 'closed' join_mode
| listAddr       | String     | Mailing list prefix. By default this is the group's urlname.
| addTopics      | String     | Comma-delimited list of topic ids to associate with group
| serviceUri     | JSON       | A URI for a social network service. Service must be one of facebook, flickr, linkedin, other, tumblr, twitter
| name           | String     | Display name of the group. Can be at most 60 characters
| editQuestions  | JSON       | Edits a current profile question identified by an id in the parameter name. The index updated index should also be encoded in the parameter name. To delete a question, set this to an empty string. Groups that require profile questions must have at least one question
| urlname        | String     | Name used for the groups web address on meetup.com. Must be between 6 and 60 characters
| who            | String     | What members of the group will be called. Can be at most 32 characters

### addNewQuestions and editQuestions format:

Key: question index

Value: question text

```json
{
	"0": "Test question",
	"12": "Test question2"
}
```

### serviceUri format:

Key: service name
Value: uri 

A URI for a social network service. **Service must be one of facebook, flickr, linkedin, other, tumblr, twitter**

```json
{
	"facebook": "http://facebook.com/page",
}
```

## Meetup.postTopics
Associates topics with a given Meetup group. Limited to organizers of the group. OAuth authenticated requests require an additional [group_edit](http://meetup.com/meetup_api/auth/#oauth2-scopes) permission.

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| urlname    | String     | Required: Group url name.
| topicId    | String     | Recomended: Comma-delimited list of topic ids to associate with group

## Meetup.deleteTopics
Disassociates topics with a given Meetup group. Limited to organizers of the group. OAuth authenticated requests require an additional [group_edit](http://meetup.com/meetup_api/auth/#oauth2-scopes) permission.

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| urlname    | String     | Required: Group url name.
| topicId    | String     | Recomended: Comma-delimited list of topic ids to disassociate with group

## Meetup.getLocations
Provides a query interface for finding known locations

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| longitude  | String     | Search for locations based on location longitude.
Must be provided with "latitude"
| page       | String     | The desired number of locations to return in a single set of results.
Defaults to 200
| offset     | String     | The current offset in the paginated set, represented as an incrementing value
| latitude   | String     | Search for locations based on location latitude.
Must be provided with "longitude"
| query      | String     | Search for locations based on city name or zip code

## Meetup.getSelfCalendar
Get a listing of all upcoming Meetup events for the authenticated member

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| fields     | String     | A comma-delimited list of optional fields names which may be appended to the response
| page       | String     | Number of results to return in a page. Defaults to 200

## Meetup.getSelfGroups
Lists the authenticated member's groups in the order of leadership,
next upcoming event, then alphabetical order by name

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| fields     | String     | A comma-delimited list of optional fields to append to the response
| page       | String     | Number of groups to return in a single page of results.
By default, this is 200

## Meetup.getPROGroups
Name and statistics range search for the meetup groups belonging to Pro organization.

| Field             | Type       | Description
|-------------------|------------|----------
| accessToken       | credentials| Required: OAuth2 Access Token
| urlname           | String     | Required: Group url name.
| country           | String     | String: Country
| pastRsvpsMin      | String     | Positive Integer: Minumum range of the total number of past RSVPs
| pastEventsMin     | String     | Positive Integer: Minumum range of the number of the past events held
| memberCountMax    | String     | Positive Integer: Maximum range of the number of members
| upcomingEventsMin | String     | Positive Integer: Minumum range of the number of the upcoming events
| longitude         | String     | Float: Longitude
| lastEventMin      | String     | Milliseconds since epoch: Minumum range of the date that the last meetup happened
| repeatRsvpersMin  | String     | Positive Integer: Minumum range of the average number of repeat rsvpers
| averageAgeMin     | String     | Positive Integer: Minumum range of the average age of the members
| lastEventMax      | String     | Milliseconds since epoch: Maximum range of the date that the last meetup happened
| radius            | String     | String: `global`, `smart`, or search radius in Float
| latitude          | String     | Float: Latitude
| foundedDateMin    | String     | Milliseconds since epoch: Minumum range of the founded dates of the groups
| order             | String     | List of String: attributes to sort on
| zip               | String     | String: Zip code
| inactiveWithinDays| String     | Positive Integer: including only those groups that did not have event in the last specified days
| offset            | String     | Positive Integer: the page offset
| topics            | String     | List of Integers: the ids of topic of the group
| upcomingEventsMax | String     | Positive Integer: Maximum range of the number of the upcoming events
| averageAgeMax     | String     | Positive Integer: Maximum range of the average age of the members
| proJoinDateMax    | String     | Milliseconds since epoch: Maximum range of the dates the groups joined Pro organization
| nextEventMin      | String     | Milliseconds since epoch: Minumum range of the date that the next meetup is scheduled
| pastRsvpsMax      | String     | Positive Integer: Maximum range of the total number of past RSVPs
| activeWithinDays  | String     | Positive Integer: including only those groups that had event in the last specified days
| rsvpsPerEventMin  | String     | Positive Integer: Minumum range of the average number of RSVPs per event
| foundedDateMax    | String     | Milliseconds since epoch: Maximum range of the founded dates of the groups
| memberCountMin    | String     | Positive Integer: Minimum range of the number of members
| pastEventsMax     | String     | Positive Integer: Maximum range of the number of the past events held
| name              | String     | String: Name of the group looking for
| nextEventMax      | String     | Milliseconds since epoch: Maximum range of the date that the next meetup is scheduled
| repeatRsvpersMax  | String     | Positive Integer: Maximum range of the average number of repeat rsvpers
| location          | String     | String: Raw location
| page              | String     | Positive Integer: the size of page window
| proJoinDateMin    | String     | Milliseconds since epoch: Minumum range of the dates the groups joined Pro organization
| rsvpsPerEventMax  | String     | Positive Integer: Maximum range of the average number of RSVPs per event
| category          | String     | List of Integers: the ids of the category of the group
| desc              | String     | List of Boolean: whether to sort ascending or decending on each attributes in `order`

## Meetup.getPROMembers
Name, location, and time based search for the members of the meetups belonging to Pro organization.

| Field            | Type       | Description
|------------------|------------|----------
| accessToken      | credentials| Required: OAuth2 Access Token
| urlname          | String     | Required: Group url name.
| zip              | String     | String: Zip code
| country          | String     | String: Country
| eventsAttendedMax| String     | Positive Integer: Maximum number of attended events
| offset           | String     | Positive Integer: the page offset
| chapters         | String     | List of Integers: The chapters which the member belongs to
| isOrganizer      | String     | Boolean: To limit to only organizers or non-organizers
| longitude        | String     | Float: Longitude
| memberName       | String     | String: Name of the member
| activeWithinDays | String     | Positive Integer: The range of date from the past until today, for the recent activity
| joinTimeMin      | String     | Milliseconds since epoch: The oldest time limit for member join
| emailReceived    | String     | Integers: The id of a previous emails that the member received
| eventsAttendedMin| String     | Positive Integer: Minimum number of attended events
| location         | String     | String: Raw location
| page             | String     | Positive Integer: the size of page window
| radius           | String     | String: `global`, `smart`, or search radius in Float
| joinTimeMax      | String     | Milliseconds since epoch: The latest time limit for member join
| latitude         | String     | Float: Latitude
| desc             | String     | Boolean: whether to sort ascending or decending
| order            | String     | String: attribute to sort on

## Meetup.getNotifications
Returns all recent Meetup notifications for the authorized member. To mark notifications read use [/notifications/read](http://meetup.com/meetup_api/docs/notifications/read/) endpoint. To get the authenticated Member's current unread count, request it in an [HTTP header](http://meetup.com/meetup_api/docs/#meta-headers).

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| fields     | String     | Request that additional fields (separated by commas) be included in the output.

## Meetup.setNotificationsRead
Marks groups of [notifications](http://meetup.com/meetup_api/docs/notifications/) as read.

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| fields     | String     | Request that additional fields (separated by commas) be included in the output.
| sinceId    | String     | The id of the newest notification item, typically the first in the list returned by the notifications endpoint

## Meetup.findTopicCategories
Returns a list high level topic categories

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| longitude  | String     | An optional approximate longitude to center a request for "best_topics"
| fields     | String     | A comma-limited list of optional fields to append to the response
| radius     | String     | An radius (in miles) to center a request for "best_topics"
| latitude   | String     | An optional approximate latitude to center a request for "best_topics"

## Meetup.getRecommendedGroupTopics
Recommends suggestions for group topics based on a text search or other topics

| Field        | Type       | Description
|--------------|------------|----------
| accessToken  | credentials| Required: OAuth2 Access Token
| page         | String     | Target number of recommendations to return. Defaults to 36.
| text         | String     | Free form text search
| lang         | String     | Defines a language preference for ordering results. Valid values are en-USen-AUde-DEeses-ESfr-FRit-ITpt-BRja-JPko-KRnl-NLen-aude-dept-bren-uses-esnl-nlit-itfr-frko-krja-jpendefritptjakonl. You may also substitute this with the Accept-Language header
| otherTopics  | String     | A comma-delimited list of topic ids to inform recommendations
| excludeTopics| String     | A comma-delimited list of topic ids to exclude from the recommendations

## Meetup.getRecommendedGroups
Returns groups Meetup finds relevant to you

| Field          | Type       | Description
|----------------|------------|----------
| accessToken    | credentials| Required: OAuth2 Access Token
| zip            | String     | Zip code you are searching for recommendations in
| country        | String     | A valid two character country code, defaults to US
| instantJoinOnly| String     | Recommend only groups without join requirements and that can be joined instantly
| location       | String     | Raw text location query
| longitude      | String     | Approximate longitude
| topicId        | String     | Comma delimited list of up to 100 topic ids to help inform recommendations
| radius         | String     | Radius in miles. May be 0.0-100.0, 'global' or 'smart', a dynamic radius based on the number of active groups in the area. Defaults to member's preferred radius
| fields         | String     | Request that additional fields (separated by commas) be included in the output.
| category       | String     | A valid category id which limits recommended groups to a particular category
| latitude       | String     | Approximate latitude

## Meetup.postRecommendedGroupsIgnore
Provides a form of feedback by requesting to remove a group from future recommendations

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| urlname    | String     | Required: Group url name.

## Meetup.getRecommendedVenues
Returns venues Meetup finds relevant to you based on location and category. This method does not yet support sorting or pagination.

| Field       | Type       | Description
|-------------|------------|----------
| accessToken | credentials| Required: OAuth2 Access Token
| zip         | String     | Zip code you are searching for recommendations in
| country     | String     | A valid two character country code, defaults to US
| usedBetween | String     | Return venues that have been used within the given time range, defined by two times separated with a single comma. Each end of the range may be specified with relative dates, such as "1m" for one month from now, or by absolute time in milliseconds since the epoch. If an endpoint is omitted, the range is unbounded on that end. The default value is unbounded on both ends (though restricted to the search window described above).
| minGroups   | String     | The minimum number of groups that have hosted events at this venue
| groupId     | String     | Comma-delimited list of up to 200 group ids to help inform recommendations
| location    | String     | Raw text location query
| longitude   | String     | Approximate longitude
| radius      | String     | Radius in miles. Defaults to member's preferred radius
| category    | String     | Comma-delimited list of up to 200 category ids to help inform recommendations
| groupUrlName| String     | Comma-delimited list of up to 200 group urlnames to help inform recommendations
| latitude    | String     | Approximate latitude

## Meetup.getSimilarGroups
Renders a list of similar groups

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| urlname    | String     | Required: Group url name.

## Meetup.findTopics
Find topics by name

| Field      | Type       | Description
|------------|------------|----------
| accessToken| String     | Required: OAuth2 Access Token
| query      | String     | Recomended: The text to topic text search for
| page       | String     | Number of results to return in a single set of results

