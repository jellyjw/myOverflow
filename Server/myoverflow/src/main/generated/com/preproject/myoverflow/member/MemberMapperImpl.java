package com.preproject.myoverflow.member;

import com.preproject.myoverflow.member.MemberDto.Patch;
import com.preproject.myoverflow.member.MemberDto.Post;
import com.preproject.myoverflow.member.MemberDto.Response;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-02-27T22:53:23+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 11.0.17 (Azul Systems, Inc.)"
)
@Component
public class MemberMapperImpl implements MemberMapper {

    @Override
    public Member MemberPostToMember(Post memberPost) {
        if ( memberPost == null ) {
            return null;
        }

        Member member = new Member();

        member.setEmail( memberPost.getEmail() );
        member.setPassword( memberPost.getPassword() );
        member.setName( memberPost.getName() );
        member.setNickname( memberPost.getNickname() );

        return member;
    }

    @Override
    public Member MemberPatchToMember(Patch memberPatch) {
        if ( memberPatch == null ) {
            return null;
        }

        Member member = new Member();

        return member;
    }

    @Override
    public Response MemberToMemberResponseDto(Member member) {
        if ( member == null ) {
            return null;
        }

        Response response = new Response();

        response.setMemberId( member.getMemberId() );
        response.setEmail( member.getEmail() );
        response.setName( member.getName() );
        response.setNickname( member.getNickname() );
        response.setCreatedAt( member.getCreatedAt() );
        response.setModifiedAt( member.getModifiedAt() );

        return response;
    }
}
