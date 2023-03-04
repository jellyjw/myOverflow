package com.preproject.myoverflow.member;

import com.preproject.myoverflow.response.SingleResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@CrossOrigin
@RestController // www.codestats.com/members/1
@RequestMapping("/members")
@Validated
@Slf4j
public class MemberController {
    //@Autowired
    private final MemberService memberService;
    private final MemberMapper mapper;

    public MemberController(MemberMapper mapper, MemberService memberService){
        this.memberService = memberService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post memberPost){

        Member member = mapper.MemberPostToMember(memberPost); //MemberDto --> Member 이제우리는 Member만쓰면된다. 이걸로 로직처리한다.

        Member createdMember = memberService.createMember(member);

        return new ResponseEntity<>(new SingleResponseDto<>(mapper.MemberToMemberResponseDto(createdMember)), HttpStatus.CREATED);
    }

    @PatchMapping("{member-id}")
    public ResponseEntity patchMember(@PathVariable("member-id") @Positive long memberId,
                                        @Valid @RequestBody MemberDto.Patch memberPatch){
        memberPatch.setMemberId(memberId);

        Member member = mapper.MemberPatchToMember(memberPatch);
        Member updateMember = memberService.updateMember(member);
        return new ResponseEntity<>(new SingleResponseDto<>(mapper.MemberToMemberResponseDto(updateMember)), HttpStatus.OK);

    }

    @GetMapping("{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") @Positive long memberId){
        Member response = memberService.findMember(memberId);
        return new ResponseEntity<>(new SingleResponseDto<>(mapper.MemberToMemberResponseDto(response)), HttpStatus.OK);
    }

    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(
            @PathVariable("member-id") @Positive long memberId) {
        memberService.deleteMember(memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
