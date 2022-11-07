using NUnit.Framework;
using PageObject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TechTalk.SpecFlow;

namespace SpecFlowProject1.Steps
{
    [Binding]
    public class CustomersPageSteps : BaseSteps
    {
        private CustomersPage customersPage;
        List<string> actualCustomers = new List<string>();
        List<string> expectedCustomers = new List<string>();

        [When(@"click on the Delete button")]
        public void WhenClickOnTheDeleteButton()
        {
            customersPage = new CustomersPage(driver);
            Thread.Sleep(1000);
            expectedCustomers = customersPage.GetCustomersList();
            expectedCustomers.RemoveAt(0);
            customersPage.ClickDeleteCustomer();
            actualCustomers = customersPage.GetCustomersList();
        }
        
        [Then(@"the result should be a list without one customer")]
        public void ThenTheResultShouldBeAListWithoutOneCustomer()
        {
            Assert.AreEqual(actualCustomers, expectedCustomers);
        }

    }
}
