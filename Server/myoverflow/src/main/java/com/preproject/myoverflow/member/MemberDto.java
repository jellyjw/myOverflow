package com.preproject.myoverflow.member;

import com.preproject.myoverflow.validator.NotSpace;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.*;
import java.time.LocalDateTime;


public class MemberDto {

    @Getter
    public static class Post{
        @NotBlank
        @Email //목요일 시간나면 이메일 인증 구현
        private String email;

        @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[₩~!@#$%^&*()_+,.<>/?:'])[A-Za-z\\d₩~!@#$%^&*()_+,.<>/?:']{8,}$"
                ,message = "8문자 이상이어야 하며 영어, 숫자, 특수문자(₩~!@#$%^&*()_+,.<>/?:')를 포함해야합니다")

        private String password;

        @Pattern(regexp = "^.{2,10}$", message = "두글자 이상 10글자 이하로 작성해주세요") //길이 : 2글자 이상
        private String nickname;
    }

    @Setter
    @Getter
    public static class Patch{
        //@NotSpace 구현
        //길이 : 2글자 이상
        @NotSpace
        @Pattern(regexp = "^.{2,10}$", message = "두글자 이상 10글자 이하로 작성해주세요") //길이 : 2글자 이상
        private String nickname;
        @NotSpace
        //길디 : 8자리 이상, 특수문자 포함, 한글안됨
        @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[₩~!@#$%^&*()_+,.<>/?:'])[A-Za-z\\d₩~!@#$%^&*()_+,.<>/?:']{8,}$"
                ,message = "8문자 이상이어야 하며 영어, 숫자, 특수문자(₩~!@#$%^&*()_+,.<>/?:')를 포함해야합니다")
        private String password;

        private long memberId;
    }

    @Setter
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response{
        private long memberId;
        private String email;
        private String nickname;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }
}