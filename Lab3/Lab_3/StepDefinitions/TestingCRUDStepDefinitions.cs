using Lab3.Model;
using NUnit.Framework;
using RestSharp;
using RestSharp.Authenticators;
using System;
using System.Net;
using TechTalk.SpecFlow;

namespace Lab_3.StepDefinitions
{
    [Binding]
    public class TestingCRUDStepDefinitions
    {
        private RestClient client;
        RestResponse<AuthToken> responseAuth;
        RestResponse responseGetBookingIds;
        RestResponse<Booking> responseCreateBooking;
        RestResponse<Booking> responseUpdateBooking;
        RestResponse responseDeleteBooking;

       [Given(@"open API documentation of restful-booker")]
        public void GivenOpenAPIDocumentationOfRestful_Booker()
        {
            client = new RestClient("https://restful-booker.herokuapp.com/");
        }

        [When(@"make AUTH request to the server")]
        public void WhenMakeAUTHRequestToTheServer()
        {
            RestRequest request = new RestRequest("auth", Method.Post);
            request.RequestFormat = DataFormat.Json;
            request.AddJsonBody(new Auth()
            {
                username = "admin",
                password = "password123"
            });
            responseAuth = client.Execute<AuthToken>(request);
        }

        [When(@"make GetBookingIds request to the server")]
        public void WhenMakeGetBookingIdsRequestToTheServer()
        {
            RestRequest request = new RestRequest("booking", Method.Get);

            responseGetBookingIds = client.Execute<Booking>(request);
        }

        [When(@"make CreateBooking request to the server")]
        public void WhenMakeCreateBookingRequestToTheServer()
        {
            // arrange
            RestRequest request = new RestRequest("booking", Method.Post);

            request.RequestFormat = DataFormat.Json;
            request.AddHeader("Content-Type", "application/json");
            request.AddJsonBody(new Booking()
            {
                firstname = "Severus",
                lastname = "Snape ",
                totalprice = 2000,
                depositpaid = true,
                bookingdates = new Bookingdates()
                {
                    checkin = "2018-01-01",
                    checkout = "2019-01-01"
                },
                additionalneeds = "Elixir"
            });
            request.AddHeader("Accept", "application/json");

             responseCreateBooking = client.Execute<Booking>(request);
        }

        [When(@"make UpdateBooking request to the server")]
        public void WhenMakeUpdateBookingRequestToTheServer()
        {
            RestRequest request = new RestRequest("booking/39324", Method.Put);
            request.RequestFormat = DataFormat.Json;
            request.AddHeader("Content-Type", "application/json");
            request.AddJsonBody(new Booking()
            {
                firstname = "Severus",
                lastname = "Snape ",
                totalprice = 1000,
                depositpaid = true,
                bookingdates = new Bookingdates()
                {
                    checkin = "2018-01-01",
                    checkout = "2019-01-01"
                },
                additionalneeds = "Elixir"
            });
            request.AddHeader("Accept", "application/json");

            client.Authenticator = new HttpBasicAuthenticator("admin", "password123");

            responseUpdateBooking = client.Execute<Booking>(request);
        }

        [When(@"make DeleteBooking request to the server")]
        public void WhenMakeDeleteBookingRequestToTheServer()
        {
            RestRequest request = new RestRequest("booking/58220", Method.Delete);

            client.Authenticator = new HttpBasicAuthenticator("admin", "password123");

            responseDeleteBooking = client.Execute(request);
        }

        [Then(@"the results should be successful")]
        public void ThenTheResultsShouldBeSuccessful()
        {
            Assert.That(responseAuth.StatusCode, Is.EqualTo(HttpStatusCode.OK));
            Assert.That(responseGetBookingIds.StatusCode, Is.EqualTo(HttpStatusCode.OK));
            Assert.That(responseCreateBooking.StatusCode, Is.EqualTo(HttpStatusCode.OK));
            Assert.That(responseUpdateBooking.StatusCode, Is.EqualTo(HttpStatusCode.OK));
            Assert.That(responseDeleteBooking.StatusCode, Is.EqualTo(HttpStatusCode.Created));
        }
    }
}
