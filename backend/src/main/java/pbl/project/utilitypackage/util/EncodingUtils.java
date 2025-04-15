package pbl.project.utilitypackage.util;

import org.apache.commons.codec.DecoderException;
import org.apache.commons.codec.binary.Base32;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.binary.Hex;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.stereotype.Component;

import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;

@Component
public class EncodingUtils
{
    private String toBinary(String input)
    {
        return input.chars()
                .mapToObj(c -> String.format("%8s", Integer.toBinaryString(c)).replace(' ', '0'))
                .reduce((a, b) -> a + " " + b).orElse("");
    }

    private String fromBinary(String binary)
    {
        String[] parts = binary.split(" ");
        StringBuilder sb = new StringBuilder();
        for (String bin : parts)
        {
            sb.append((char) Integer.parseInt(bin, 2));
        }
        return sb.toString();
    }

    private String toHex(String input)
    {
        return Hex.encodeHexString(input.getBytes(StandardCharsets.UTF_8));
    }

    private String fromHex(String hex)
    {
        try
        {
            return new String(Hex.decodeHex(hex), StandardCharsets.UTF_8);
        }
        catch (DecoderException e)
        {
            throw new RuntimeException(e);
        }
    }

    private String toUnicode(String input)
    {
        StringBuilder unicode = new StringBuilder();
        for (char c : input.toCharArray())
        {
            unicode.append("\\u").append(String.format("%04x", (int) c));
        }
        return unicode.toString();
    }

    private String fromUnicode(String unicode)
    {
        String[] parts = unicode.split("\\\\u");
        StringBuilder sb = new StringBuilder();
        for (String part : parts)
        {
            if (!part.isEmpty())
            {
                int codePoint = Integer.parseInt(part, 16);
                sb.append((char) codePoint);
            }
        }
        return sb.toString();
    }

    public String encode(String type, String input)
    {
        return switch (type.toUpperCase())
        {
            case "BIN" -> toBinary(input);
            case "HEX" -> toHex(input);
            case "UNICODE" -> toUnicode(input);
            case "URL" -> URLEncoder.encode(input, StandardCharsets.UTF_8);

            case "UTF-8", "UTF-16", "UTF-16BE", "UTF-16LE", "UTF-32", "UTF-32BE", "UTF-32LE",
                 "US-ASCII", "ISO-8859-1", "ISO-8859-2", "ISO-8859-5", "ISO-8859-6", "ISO-8859-7",
                 "ISO-8859-8", "ISO-8859-9", "WINDOWS-1251", "WINDOWS-1252", "WINDOWS-1256",
                 "KOI8-R", "KOI8-U", "EUC-KR", "EUC-JP", "EUC-CN", "GB2312", "GBK", "BIG5",
                 "SHIFT_JIS", "X-MACROMAN", "X-MACCYRILLIC", "TIS-620", "IBM866" ->
                    new String(input.getBytes(StandardCharsets.UTF_8), Charset.forName(type));

            case "BASE64" -> Base64.encodeBase64String(input.getBytes(StandardCharsets.UTF_8));
            case "BASE32" -> new Base32().encodeToString(input.getBytes(StandardCharsets.UTF_8));

            case "MD2" -> DigestUtils.md2Hex(input);
            case "MD5" -> DigestUtils.md5Hex(input);
            case "SHA-1" -> DigestUtils.sha1Hex(input);
            case "SHA-256" -> DigestUtils.sha256Hex(input);
            case "SHA-384" -> DigestUtils.sha384Hex(input);
            case "SHA-512" -> DigestUtils.sha512Hex(input);
            case "SHA3-224" -> DigestUtils.sha3_224Hex(input);
            case "SHA3-256" -> DigestUtils.sha3_256Hex(input);
            case "SHA3-384" -> DigestUtils.sha3_384Hex(input);
            case "SHA3-512" -> DigestUtils.sha3_512Hex(input);

            default -> throw new IllegalArgumentException("지원하지 않는 인코딩 타입: " + type);
        };
    }

    public String decode(String type, String input)
    {
        return switch (type.toUpperCase())
        {
            case "BIN" -> fromBinary(input);
            case "HEX" -> fromHex(input);
            case "UNICODE" -> fromUnicode(input);
            case "URL" -> java.net.URLDecoder.decode(input, StandardCharsets.UTF_8);

            case "UTF-8", "UTF-16", "UTF-16BE", "UTF-16LE", "UTF-32", "UTF-32BE", "UTF-32LE",
                 "US-ASCII", "ISO-8859-1", "ISO-8859-2", "ISO-8859-5", "ISO-8859-6", "ISO-8859-7",
                 "ISO-8859-8", "ISO-8859-9", "WINDOWS-1251", "WINDOWS-1252", "WINDOWS-1256",
                 "KOI8-R", "KOI8-U", "EUC-KR", "EUC-JP", "EUC-CN", "GB2312", "GBK", "BIG5",
                 "SHIFT_JIS", "X-MACROMAN", "X-MACCYRILLIC", "TIS-620", "IBM866" ->
                    new String(input.getBytes(Charset.forName(type)), StandardCharsets.UTF_8);

            case "BASE64" -> new String(Base64.decodeBase64(input), StandardCharsets.UTF_8);
            case "BASE32" -> new String(new Base32().decode(input), StandardCharsets.UTF_8);

            case "MD2", "MD5", "SHA-1", "SHA-256", "SHA-384", "SHA-512", "SHA3-224", "SHA3-256", "SHA3-384",
                 "SHA3-512" -> throw new UnsupportedOperationException(type + "는 디코딩할 수 없습니다.");

            default -> throw new IllegalArgumentException("지원하지 않는 디코딩 타입: " + type);
        };
    }
}