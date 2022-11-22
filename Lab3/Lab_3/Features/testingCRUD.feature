@setup_feature
Feature: testingCRUD

Scenario: Testing CRUD
	Given open API documentation of restful-booker 
	When make AUTH request to the server
	When make GetBookingIds request to the server
	When make CreateBooking request to the server
	When make UpdateBooking request to the server
	When make DeleteBooking request to the server
	Then the results should be successful
