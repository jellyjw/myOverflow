package com.preproject.myoverflow.auth.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.preproject.myoverflow.member.Member;
import com.preproject.myoverflow.member.MemberDto;
import com.preproject.myoverflow.member.MemberMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class MemberAuthenticationSuccessHandler implements AuthenticationSuccessHandler {  // (1)
    // (2)
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        // 인증 성공 후, 로그를 기록하거나 사용자 정보를 response로 전송하는 등의 추가 작업을 할 수 있다.
        Gson gson = new Gson();
        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");
        MemberId memberId = new MemberId((Member) authentication.getPrincipal());

        response.getWriter().write(gson.toJson(memberId));
        log.info("# Authenticated successfully!");
    }

    private class MemberId{
        long memberId;
        public MemberId(Member member){
            this.memberId = member.getMemberId();
        }
    }
}
