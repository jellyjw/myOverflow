package com.preproject.myoverflow.exception;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    COFFEE_NOT_FOUND(404, "Coffee not found"),
    COFFEE_CODE_EXISTS(409, "Coffee Code exists"),
    ORDER_NOT_FOUND(404, "Order not found"),
    CANNOT_CHANGE_ORDER(403, "Order can not change"),
    NOT_IMPLEMENTATION(501, "Not Implementation"),
    INVALID_MEMBER_STATUS(400, "Invalid member status"),
    QUESTION_NOT_MATCH(404, "질문이 일치하지 않습니다"),
    ANSWER_NOT_FOUND(404, "답변을 찾을 수 없습니다"),
    QUESTION_NOT_FOUND(404, "등록된 질문이 없습니다"),
    MEMBER_NOT_MATCH(404,"멤버가 일치하지 않습니다");



    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
