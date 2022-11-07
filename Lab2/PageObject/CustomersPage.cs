using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PageObject
{
    public class CustomersPage : BasePage
    {
        private static WebDriverWait wait;
        public CustomersPage(IWebDriver webDriver) : base(webDriver) {
            wait = new WebDriverWait(webDriver, TimeSpan.FromSeconds(3));
        }

        private IWebElement btnDeleteCustomer => wait.Until(e => e.FindElement(By.XPath("//tr/td[5]/button"))); 

        private List<IWebElement> CustomersList => wait.Until(e => e.FindElements(By.XPath("//tbody/tr[@class='ng-scope']")).ToList<IWebElement>());

        public void ClickDeleteCustomer() => btnDeleteCustomer.Click();
        public List<string> GetCustomersList() => CustomersList.Select(el => el.Text).ToList<string>();

    }
}
