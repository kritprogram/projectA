package com.gmail.kritprogram.hello;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Controller
public class GreetingController {

    private static String lol = "abcd";

    @RequestMapping("/greeting")
    public String greeting(@RequestParam(value = "name", required = false, defaultValue = "World") String name, Model model) {
        model.addAttribute("name", name);
        //lol = name;
        return "greeting";
    }

    @RequestMapping("/index")
    public String index(Model model) {
        model.addAttribute("name", lol);
        return "index";
    }
}