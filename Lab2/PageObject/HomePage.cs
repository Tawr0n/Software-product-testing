using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PageObject
{
    public class HomePage : BasePage
    {
        private static WebDriverWait wait;
        public HomePage(IWebDriver webDriver) : base(webDriver)
        {
            wait = new WebDriverWait(webDriver, TimeSpan.FromSeconds(3));
        }
        private IWebElement BankManagerLoginBtn => wait.Until(e => e.FindElement(By.XPath("//button[@ng-click='manager()']")));
        public void ClickBankManagerLogin() => BankManagerLoginBtn.Click();
    }
}
