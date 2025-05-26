package pbl.project.utilitypackage.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pbl.project.utilitypackage.dto.response.CustomApiResponse;
import pbl.project.utilitypackage.service.ApiV1Service;
import pbl.project.utilitypackage.service.StringUtilService;
import pbl.project.utilitypackage.dto.request.ConvertImageRequestDto;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class ApiV1Controller
{
    private final StringUtilService stringUtilService;
    private final ApiV1Service apiV1Service;

    @ResponseBody
    @PostMapping("/string/encode")
    public CustomApiResponse<String> stringEncoding(String input, String type)
    {
        return CustomApiResponse.OK(stringUtilService.stringEncoding(input, type));
    }

    @ResponseBody
    @PostMapping("/string/decode")
    public CustomApiResponse<String> stringDecoding(String input, String type)
    {
        return CustomApiResponse.OK(stringUtilService.stringDecoding(input, type));
    }

    @PostMapping("/image/convert")
    public CustomApiResponse<String> convertImage(ConvertImageRequestDto requestDto)
    {
        return CustomApiResponse.OK(apiV1Service.convertImage(requestDto));
    }

    @PostMapping("/image/upscale")
    public CustomApiResponse<String> upscaleImage(@RequestParam("image") MultipartFile image)
    {
        return CustomApiResponse.OK(apiV1Service.upscaleImage(image));
    }

    @GetMapping("/domain/info")
    public CustomApiResponse<String> getDomainInfo(@RequestParam("domain") String domain)
    {
        return CustomApiResponse.OK(apiV1Service.getDomainInfo(domain));
    }

}
