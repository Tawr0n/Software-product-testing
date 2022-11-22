using Lab3.Model;
using NUnit.Framework;
using RestSharp;
using System;
using System.Net;
using TechTalk.SpecFlow;

namespace Lab_3.StepDefinitions
{
    [Binding]
    public class HTTPCatsStepDefinitions
    {
        RestClient client;
        RestRequest request;
        RestResponse response;

        [Given(@"open HTTP Cats site")]
        public void GivenOpenHTTPCatsSite()
        {
            client = new RestClient("https://http.cat/");
        }

        [When(@"make GET request to the server")]
        public void WhenMakeGETRequestToTheServer()
        {
            request = new RestRequest("100", Method.Get);
            response = client.Execute(request);
        }

        [Then(@"the result should be successful")]
        public void ThenTheResultShouldBeSuccessful()
        {
            Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.OK));
        }
    }
}
