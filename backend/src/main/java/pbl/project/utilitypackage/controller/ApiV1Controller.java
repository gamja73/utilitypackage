package pbl.project.utilitypackage.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pbl.project.utilitypackage.service.StringUtilService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class ApiV1Controller
{
    private final StringUtilService stringUtilService;

    @ResponseBody
    @PostMapping("/string/encode")
    public String stringEncoding(String input, String type)
    {
        return stringUtilService.stringEncoding(input, type);
    }

    @ResponseBody
    @PostMapping("/string/decode")
    public String stringDecoding(String input, String type)
    {
        return stringUtilService.stringDecoding(input, type);
    }

}
