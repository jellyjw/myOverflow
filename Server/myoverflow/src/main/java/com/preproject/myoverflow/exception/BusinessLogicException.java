package com.preproject.myoverflow.exception;

import lombok.Getter;

import java.io.Serializable;

public class BusinessLogicException extends RuntimeException implements Serializable {
    @Getter
    private ExceptionCode exceptionCode;

    public BusinessLogicException(ExceptionCode exceptionCode) {
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
    }

    public ExceptionCode getExceptionCode(){
        return exceptionCode;
    }
}
