package com.preproject.myoverflow.advice;

import com.preproject.myoverflow.exception.BusinessLogicException;
import com.preproject.myoverflow.exception.ExceptionCode;
import com.preproject.myoverflow.response.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.validation.ConstraintViolationException;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionAdvice {

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST) //Post에서 전송되는 데이터에 대한 유효성 검증 에러 처리.

    public ErrorResponse handleMethodArgumentNotValidException(
            MethodArgumentNotValidException e){
        final ErrorResponse response = ErrorResponse.of(e.getBindingResult());

        return response;
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler //URI변수로 넘어오는 값의 유효성 검증
    public ErrorResponse handleConstraintViolationException(
            ConstraintViolationException e){
        final ErrorResponse response = ErrorResponse.of(e.getConstraintViolations());

        return response;
    }

    @ExceptionHandler//적절하지 않은 http method 에의한 에러처리
    @ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
    public ErrorResponse handleHttpRequestMethodNotSupportedException(
            HttpRequestMethodNotSupportedException e){
        final ErrorResponse response = ErrorResponse.of(HttpStatus.METHOD_NOT_ALLOWED);

        return response;
    }

    @ExceptionHandler//우리가 만든 BusinessLogicException을 이용하는 경우임
    public ResponseEntity handleBusinessLogicException(BusinessLogicException e){
        log.error("# BusinessLogicException", e);
        System.out.println(e.getExceptionCode().getStatus());
        System.out.println(e.getExceptionCode().getMessage());
        final ErrorResponse response = ErrorResponse.of(e.getExceptionCode());

        return new ResponseEntity(HttpStatus.valueOf(e.getExceptionCode().getStatus()));
    }
}