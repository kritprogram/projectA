package com.gmail.kritprogram.hello;

import arduino.Arduino;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
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
        try {
            Arduino arduino = new Arduino("COM4", 9600);
            boolean connected = arduino.openConnection();
            System.out.println("Соединение установлено: " + connected);
            String input = "";
            int count = 0;
            while (input.isEmpty()) {
                input = arduino.serialRead();
                count ++;
                if (count >= 100){
                    throw new Exception();
                }
                Thread.sleep(100);
            }
            arduino.closeConnection();
            String[] nums = input.split("\n");
            String hexNum = "FFFFFFFF";
            for (int i = nums.length - 1; i >= 0; i--) {
                hexNum = hexNum + nums[i];
            }
            System.out.println("Считал" + Long.parseUnsignedLong(hexNum, 16));
            return "" + Long.parseUnsignedLong(hexNum, 16);
        } catch (Exception e){
            return "11111111";
        }
    }
}