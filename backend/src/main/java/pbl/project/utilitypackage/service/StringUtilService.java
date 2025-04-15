package pbl.project.utilitypackage.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pbl.project.utilitypackage.util.EncodingUtils;

@Service
@RequiredArgsConstructor
public class StringUtilService
{
    private final EncodingUtils encodingUtils;

    public String stringEncoding(String input, String type)
    {
        return encodingUtils.encode(type, input);
    }

    public String stringDecoding(String input, String type)
    {
        return encodingUtils.decode(type, input);
    }
}
