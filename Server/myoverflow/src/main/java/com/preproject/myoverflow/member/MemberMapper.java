package com.preproject.myoverflow.member;

import com.preproject.myoverflow.question.Question;
import com.preproject.myoverflow.question.QuestionDto;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    Member MemberPostToMember(MemberDto.Post memberPost);

    default Member MemberPatchToMember(MemberDto.Patch memberPatch){
        List<String> roles = new ArrayList<>();
        Member member = new Member();
        member.setNickname(memberPatch.getNickname());
        member.setMemberId(memberPatch.getMemberId());
        member.setPassword(memberPatch.getPassword());
        member.setRoles(roles);
        return member;
    }

    MemberDto.Response MemberToMemberResponseDto(Member member);
//    List<QuestionDto.Response> questionsToResponses(List<Question> questions);
}

