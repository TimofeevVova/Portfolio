﻿using Microsoft.AspNetCore.Mvc;
using Portfolio.Models;
using System.Diagnostics;

namespace Portfolio.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Works()
        {
            return View();
        }

        public IActionResult Contacts()
        {
            return View();
        }        
        public IActionResult DataBase()
        {
            return View();
        }
        public IActionResult ModalWindow()
        {
            return PartialView();
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}