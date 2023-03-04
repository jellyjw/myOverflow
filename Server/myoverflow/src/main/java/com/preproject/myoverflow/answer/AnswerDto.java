package com.preproject.myoverflow.answer;

import com.preproject.myoverflow.validator.NotSpace;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

public class AnswerDto {
    @Getter
    public static class Post {
        @NotBlank(message = "답변을 작성해 주세요")
        private String content;

        @Positive(message = "답변의 질문 없음")
        private long questionId;

        @Positive
        private long memberId;
    }

    @Getter
    @Setter
    public static class Patch {
        private long answerId;

        @NotSpace
        private String content;

        private String memberId;
    }

    @AllArgsConstructor
    @Getter
    public static class Response{
        private long answerId;
        private String content;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private String answerOpenStatus;
        private String memberId;
        private String nickname;
    }
}
