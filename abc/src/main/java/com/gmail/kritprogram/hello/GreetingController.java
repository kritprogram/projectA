package com.gmail.kritprogram.hello;

import arduino.Arduino;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

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

    @RequestMapping("/rfid")
    @ResponseBody
    public String getRfidData(Model model){
        Arduino arduino = new Arduino("COM6", 9600);
        boolean connected = arduino.openConnection();
        System.out.println("Соединение установлено: " + connected);

        String input = "";
        while(input.isEmpty()){
            input = arduino.serialRead();
        }
        arduino.closeConnection();
        return input;

    }
}