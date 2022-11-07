using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SpecFlowProject1.Steps
{
    [Binding]
    public class BaseSteps
    {
        protected static WebDriverWait wait;
        protected static IWebDriver driver;
        [BeforeFeature]
        public static void BeforeFeature()
        {
            driver = new ChromeDriver();
            wait = new WebDriverWait(driver, TimeSpan.FromSeconds(3));
        }
        [AfterFeature]
        public static void AfterFeature()
        {
            driver.Close();
        }
    }

}
