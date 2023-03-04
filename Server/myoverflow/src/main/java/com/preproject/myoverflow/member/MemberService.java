package com.preproject.myoverflow.member;

//import com.preproject.myoverflow.auth.utils.CustomAuthorityUtils;
//import org.springframework.security.crypto.password.PasswordEncoder;
import com.preproject.myoverflow.auth.CustomAuthorityUtils;
import com.preproject.myoverflow.exception.BusinessLogicException;
import com.preproject.myoverflow.exception.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MemberService {
    private final MemberRepository memberRepository;

    private final PasswordEncoder passwordEncoder;

    private final CustomAuthorityUtils authorityUtils;

    public MemberService(MemberRepository memberRepository,
                         PasswordEncoder passwordEncoder,
                         CustomAuthorityUtils authorityUtils){
        this.authorityUtils = authorityUtils;
        this.passwordEncoder = passwordEncoder;
        this.memberRepository = memberRepository;
    }


    public Member createMember(Member member){
        verifyExistsEmail(member.getEmail());
        String encrtptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encrtptedPassword);

        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        Member createdMember = memberRepository.save(member);
        return createdMember;
    }

    public Member updateMember(Member member){
        Member foundMember = findVerifiedMember(member.getMemberId());
        Optional.ofNullable(member.getNickname())
                .ifPresent(nickname -> foundMember.setNickname(nickname));
        Optional.ofNullable(member.getPassword())
                .ifPresent(password -> foundMember.setPassword(password));
        Optional.ofNullable(member.getMemberStatus())
                .ifPresent(memberStatus -> foundMember.setMemberStatus(memberStatus));
        Member updateMember = memberRepository.save(foundMember);
        return updateMember;
    }

    @Transactional(readOnly = true)
    public Member findMember(long memberId){
        return findVerifiedMember(memberId);
    }
    @Transactional(readOnly = true)
    public Page<Member> findMembers(int page, int size) {
        return memberRepository.findAll(PageRequest.of(page, size,
                Sort.by("memberId").descending()));
    }

    public void deleteMember(long memberId){
        Member foundMember = findVerifiedMember(memberId);
        foundMember.setMemberStatus(Member.MemberStatus.MEMBER_QUIT);
        memberRepository.save(foundMember);
//        memberRepository.deleteById(memberId);
    }

    public Member findVerifiedMember(long memberId){
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member foundMember = optionalMember.orElseThrow(()->null);
        return foundMember;
    }

    private void verifyExistsEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }
}