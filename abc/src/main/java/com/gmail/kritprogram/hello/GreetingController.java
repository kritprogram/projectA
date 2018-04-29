package com.gmail.kritprogram.hello;

import arduino.Arduino;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class GreetingController {


    @RequestMapping("/index")
    public String index(Model model) {
        return "index";
    }

    @RequestMapping("/rfid")
    @ResponseBody
    public String getRfidData(Model model) {
        return "-1057462234";
        /*Arduino arduino = new Arduino("COM4", 9600);
        boolean connected = arduino.openConnection();
        System.out.println("Соединение установлено: " + connected);

        String input = "";
        while(input.isEmpty()){
            input = arduino.serialRead();
        }
        arduino.closeConnection();
        String[] nums = input.split("\n");
        String hexNum = "FFFFFFFF";
        for (int i = nums.length - 1; i >= 0; i--) {
            hexNum = hexNum + nums[i];
        }

        System.out.println("Считал" + Long.parseUnsignedLong(hexNum, 16))
        return "" + Long.parseUnsignedLong(hexNum, 16);*/
    }
}