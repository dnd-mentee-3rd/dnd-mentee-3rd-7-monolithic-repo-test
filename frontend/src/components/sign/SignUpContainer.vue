<template>
  <div
    class="RegisterContainer"
    :class="{
      'RegisterContainer-FirstStage': stage === 0,
      'RegisterContainer-SecondStage': stage === 1,
      'RegisterContainer-ThirdStage': stage === 2
    }"
  >
    <header class="ImageContainer">
      <img
        v-if="stage < 4"
        class="ImageContainer__Cover"
        :src="headerImg[stage]"
      />
      <img
        v-bind:class="{
          ImageContainer__Earth: stage < 4,
          'ImageContainer__Earth-drop': stage === 4
        }"
        :src="headerImg[4]"
      />

      <img
        class="ImageContainer__Leaf"
        v-bind:class="{
          'ImageContainer__final-show': stage === 4
        }"
        src="@/assets/images/leaf.svg"
      />

      <img
        class="ImageContainer__Hand"
        v-bind:class="{
          'ImageContainer__final-show': stage === 4
        }"
        src="@/assets/images/hand.svg"
      />

      <img
        class="ImageContainer__Light"
        v-bind:class="{
          'ImageContainer__final-show': stage === 4
        }"
        src="@/assets/images/light.svg"
      />

      <transition name="trash-disappear">
        <img
          v-if="stage < 2"
          class="ImageContainer__rm ImageContainer__rm1"
          src="@/assets/images/except_1.svg"
        />
      </transition>
      <transition name="trash-disappear">
        <img
          v-if="stage < 1"
          class="ImageContainer__rm ImageContainer__rm2"
          src="@/assets/images/pass_934.svg"
        />
      </transition>

      <transition name="trash-disappear">
        <img
          v-if="stage < 4"
          class="ImageContainer__rm ImageContainer__spoon"
          src="@/assets/images/spoon.svg"
        />
      </transition>

      <transition name="trash-disappear">
        <img
          v-if="stage < 1"
          class="ImageContainer__rm ImageContainer__straw"
          src="@/assets/images/straw.svg"
        />
      </transition>

      <transition name="trash-disappear">
        <img
          v-if="stage < 4"
          class="ImageContainer__rm ImageContainer__bottle"
          src="@/assets/images/bottle.svg"
        />
      </transition>

      <transition name="trash-disappear">
        <img
          v-if="stage < 2"
          class="ImageContainer__rm ImageContainer__shampoo"
          src="@/assets/images/shampoo.svg"
        />
      </transition>

      <transition name="trash-disappear">
        <img
          v-if="stage < 1"
          class="ImageContainer__rm ImageContainer__BigBottle"
          src="@/assets/images/BigBottle.svg"
        />
      </transition>

      <transition name="trash-disappear">
        <img
          v-if="stage < 1"
          class="ImageContainer__rm ImageContainer__pet"
          src="@/assets/images/pet.svg"
        />
      </transition>

      <transition name="trash-disappear">
        <img
          v-if="stage < 2"
          class="ImageContainer__rm ImageContainer__fork"
          src="@/assets/images/fork.svg"
        />
      </transition>

      <transition name="trash-disappear">
        <img
          v-if="stage < 4"
          class="ImageContainer__rm ImageContainer__lightspoon"
          src="@/assets/images/lightspoon.svg"
        />
      </transition>
    </header>
    <main class="Main">
      <img
        class="RegisterContainer__character"
        :class="{
          'RegisterContainer__character-shrink': stage >= 1,
          'RegisterContainer__character-final_position': stage === 4
        }"
        src="@/assets/images/group_404.svg"
      />
      <transition name="slide-left">
        <div v-if="stage === 0" class="TextContainer">
          <p class="TextContainer_text">
            <span class="TextContainer__span">그린이</span>가 되어
          </p>
          <p class="TextContainer_text">쓰레기를 똑똑하게 버리고</p>
          <p class="TextContainer_text">
            지구를 <span span class="TextContainer__span">그린별</span>로
            만들어봐요!
          </p>
        </div>
      </transition>

      <div class="FormContainer RegisterFormContainer">
        <form
          v-on:submit.prevent="onSubmit"
          class="RegisterFormContainer__FormTag"
        >
          <transition name="slide-left">
            <div v-if="stage === 0" class="EmailInputContainer">
              <label
                class="FormContainer__label RegisterFormContainer__EmailLabel"
                for="email"
                >이메일</label
              >
              <input
                class="FormContainer__input FormContainer__EmailInput"
                :class="{ FormInputError: error }"
                id="email"
                type="text"
                v-model="userData.email"
              />
              <div class="RegisterErrorContainer">
                <p
                  class="RegisterErrorContainer__Text RegisterErrorContainer__Text-shadow"
                >
                  {{ error ? logMessage.EmailError : "" }}
                </p>
              </div>
            </div>
          </transition>

          <transition name="go-up">
            <div v-if="stage === 1" class="NickNameInputContainer">
              <label
                class="FormContainer__label RegisterFormContainer__label-darkgreen"
                for="username"
                >닉네임</label
              >
              <input
                class="FormContainer__input"
                :class="{ FormInputError: error }"
                id="username"
                type="text"
                v-model="userData.username"
              />
              <div class="RegisterErrorContainer">
                <p class="RegisterErrorContainer__Text">
                  {{ error ? logMessage.userNameError : "" }}
                </p>
              </div>
            </div>
          </transition>

          <transition name="slide-left">
            <div v-if="stage === 2 || stage === 3" class="PWInputContainer">
              <label
                class="FormContainer__label RegisterFormContainer__labelPassword"
                for="password"
                >비밀번호
                <img
                  v-if="isValidPWD"
                  class="PWInputContainer__check"
                  src="@/assets/images/Yes.svg"
                />
                <img
                  v-else
                  class="PWInputContainer__check"
                  src="@/assets/images/No.svg"
                />
              </label>
              <div class="PasswordTextBlock">
                <span class="PasswordTextBlock__Text">
                  영어숫자를 포함한 4자리 이상!
                </span>
              </div>

              <div class="PasswordContainer">
                <input
                  class="FormContainer__input RegisterFormContainer__Passwordinput"
                  :class="{ FormInputError: error }"
                  id="password"
                  :type="passwordType"
                  v-model="userData.password"
                />

                <img
                  v-if="passwordType === 'password'"
                  @click="TogglePWD"
                  class="PWInputContainer__eyes"
                  src="@/assets/images/NoEyes.svg"
                />
                <img
                  v-else
                  @click="TogglePWD"
                  class="PWInputContainer__eyes"
                  src="@/assets/images/Eyes.svg"
                />
              </div>

              <div class="RegisterErrorContainer">
                <p class="RegisterErrorContainer__Text">
                  {{ error && !isValidPWD ? logMessage.PWError : "" }}
                </p>
              </div>

              <label
                class="FormContainer__label RegisterFormContainer__labelPassword"
                for="passwordCheck"
                >비밀번호 확인
                <img
                  v-if="isValidPwdCheck"
                  class="PWInputContainer__check"
                  src="@/assets/images/Yes.svg"
                />
                <img
                  v-else
                  class="PWInputContainer__check"
                  src="@/assets/images/No.svg"
                />
              </label>

              <div class="PasswordContainer">
                <input
                  class="FormContainer__input"
                  :class="{
                    FormInputError: error && !isValidPwdCheck
                  }"
                  id="passwordCheck"
                  :type="passwordType"
                  v-model="passwordCheck"
                />
                <img
                  v-if="passwordType === 'password'"
                  @click="TogglePWD"
                  class="PWInputContainer__eyes"
                  src="@/assets/images/NoEyes.svg"
                />
                <img
                  v-else
                  @click="TogglePWD"
                  class="PWInputContainer__eyes"
                  src="@/assets/images/Eyes.svg"
                />

                <div class="RegisterErrorContainer">
                  <p class="RegisterErrorContainer__Text">
                    {{
                      error && !isValidPwdCheck ? logMessage.PWCheckError : ""
                    }}
                  </p>
                </div>
              </div>
            </div>
          </transition>

          <div class="FinalTextContainer" v-if="stage === 4">
            <p class="FinalTextContainer__Text">그리니 님의</p>
            <p class="FinalTextContainer__Text">회원가입을 축하합니다!</p>
          </div>

          <div class="FinalTextContainer" v-if="stage === 1">
            <p class="FinalTextContainer__Text"></p>
            <p class="FinalTextContainer__Text FinalTextContainer__Text-white">
              조금 더 깨끗해지는 중!!
            </p>
          </div>

          <button
            class="FormContainer__button RegisterFormContainer__button"
            @click="nextStage"
          >
            {{ buttonText[stage] }}
          </button>
        </form>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { signUp, signIn } from "../../api/sign";
import { UserSignUp, UserSignIn } from "@/api/sign/type";
import { getToken, getRefToken } from "@/api/token";
import { TokenData } from "@/api/token/type";
import { validateEmail } from "@/utils/validation";
import { genErrorMessage } from "@/utils/errors";
import {
  saveAuthToCookie,
  saveUserToCookie,
  getAuthFromCookie
} from "@/utils/cookies";

export default Vue.extend({
  name: "SignUpContainer",
  data() {
    return {
      userData: { email: "", username: "", password: "", token: "" },
      stage: 0,
      error: false,
      headerImg: [
        require(`@/assets/images/FirstStageEarth.svg`),
        require(`@/assets/images/TwoStageEarth.svg`),
        require(`@/assets/images/ThreeStageEarth.svg`),
        require(`@/assets/images/FourthStageEarth.svg`),
        require(`@/assets/images/FifthStageEarth.svg`)
      ],
      buttonText: ["가입하기", "다음", "다음", "다음", "회원가입 끝!"],
      logMessage: {
        EmailError: genErrorMessage("이메일이"),
        PWError: genErrorMessage("비밀번호가"),
        PWCheckError: "비밀번호가 일치하지 않아요:(",
        userNameError: "닉네임이은 6자리 이상이에요:("
      },
      passwordCheck: "",
      passwordType: "password"
    };
  },
  watch: {
    passwordCheck: function(newVal: string, oldVal: string) {
      if (newVal && this.stage === 2) {
        this.stage += 1;
      }
    }
  },
  computed: {
    isValidPWD: function(): boolean {
      return this.userData.password.length < 6 ? false : true;
    },
    isValidPwdCheck: function(): boolean {
      return this.passwordCheck && this.userData.password === this.passwordCheck
        ? true
        : false;
    },
    isValidEmail: function(): boolean {
      return validateEmail(this.userData.email);
    },
    isValidUsername: function(): boolean {
      return this.userData.username.length < 6 ? false : true;
    }
  },
  created() {
    this.initForm();
  },
  methods: {
    nextStage() {
      switch (this.stage) {
        case 0: //email
          if (this.isError(!this.isValidEmail)) {
            return;
          }
          break;
        case 1: //nickname
          if (this.isError(!this.isValidUsername)) {
            return;
          }
          break;
        case 2: //pwd
        case 3: //pwd check
          if (this.isError(!this.validatePWD())) {
            return;
          }
          break;
        default:
          break;
      }
      this.stage = this.stage + 1;
      this.error = false;
    },
    async submitForm() {
      //const { data } = await signUp(userData);
      try {
        await signUp(this.userData);
        // const signInData: UserSignIn = {
        //   email: this.userData.email,
        //   password: this.userData.password
        // };
        // await this.$store.dispatch("SIGN_IN", signInData);
      } catch (error) {
        console.log("error", error);
      }

      this.initForm();
      setTimeout(() => {
        this.$store.commit("signModal/close");
      }, 1500);
    },
    initForm(): void {
      this.userData.email = "";
      this.userData.password = "";
      this.userData.username = "";
    },
    onSubmit() {
      if (this.stage === 4) {
        this.submitForm();
      }
    },
    validatePWD(): boolean {
      return this.isValidPWD && this.isValidPwdCheck;
    },
    isError(condition: boolean) {
      this.error = condition;
      return this.error;
    },
    TogglePWD(): void {
      this.passwordType =
        this.passwordType === "password" ? "text" : "password";
    }
  }
});
</script>

<style lang="scss" scoped>
$email-input-location: 71vh;
$nickname-input-location: 34vh;
$final-position: 40px;

.slide-left-leave-active,
.go-up-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-left-leave-to,.go-up-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(-25vw);
  opacity: 0;
}

.trash-disappear-leave-active {
  transition: all 3s cubic-bezier(1, 0.5, 0.8, 1);
}

.trash-disappear-leave-to {
  transform: translateY(100vh) !important;
  opacity: 0;
}

.go-up-enter-active {
  transition: all 2s ease;
  // transition-delay: 1s;
}

.go-up-enter {
  transform: translateY(37vh);
}

.RegisterContainer-FirstStage {
  background: linear-gradient(to top, #656565, #000000);
}

.RegisterContainer-SecondStage {
  background: linear-gradient(to top, #ffffff, #8c8c8c, #000000);
}

.RegisterContainer-ThirdStage {
  background: linear-gradient(to top, #ffffff, #8c8c8c);
}

.RegisterContainer {
  position: relative;
  width: 100%;
  height: 100vh;

  .ImageContainer__Cover {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .ImageContainer__Earth {
    position: fixed;
    width: 100%;
    top: -30vh;
    left: 50%;
    transform: translateX(-50%);
    transform: scale(2);
    visibility: hidden;
    z-index: 1;
  }
  .ImageContainer__Light {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 28px + $final-position;
    opacity: 0;
    z-index: -1;
  }
  .ImageContainer__Leaf {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 68px + $final-position;
    opacity: 0;
  }

  .ImageContainer__Hand {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 229px + $final-position;
    opacity: 0;
  }

  .ImageContainer__final-show {
    opacity: 1;
    transition: all 0.5s ease;
  }
  .ImageContainer__Earth-drop {
    position: absolute;
    top: 107px + $final-position;
    left: 50%;
    transform: translateX(-50%);
    transition: all 0.5s ease;
  }

  .ImageContainer__rm {
    position: absolute;
    transform: rotate(180deg);
  }

  .ImageContainer__rm1 {
    top: 4.5vh;
    left: 2.4vw;
  }

  .ImageContainer__rm2 {
    top: 19vh;
    left: 5vw;
  }

  .ImageContainer__lightspoon {
    top: 11vh;
    left: 3vw;
    opacity: 0.5;
  }

  .ImageContainer__spoon {
    right: 100px;
    top: 71px;
    transform: rotate(-64deg);
  }

  .ImageContainer__straw {
    top: 100px;
    left: 89px;
  }

  .ImageContainer__bottle {
    top: 50px;
    right: 150px;
  }

  .ImageContainer__shampoo {
    top: 150px;
    left: 180px;
  }
  .ImageContainer__BigBottle {
    top: 3px;
    right: 87px;
  }

  .ImageContainer__fork {
    top: 44px;
    right: 13px;
  }
  .ImageContainer__pet {
    top: 92px;
    right: 0;
  }

  .Main {
    height: 100%;
    .RegisterContainer__character {
      position: absolute;
      top: 180px;
      left: 61%;
    }

    .RegisterContainer__character-shrink {
      transform: scale(0.5);
      transform-origin: 100% 0%;
      animation: transform 2s ease-in;
    }
    .RegisterContainer__character-final_position {
      left: 50%;
      transform: scale(0.5) translateX(-144%);
      top: 19px + $final-position;
      animation: all 0.5s ease-in;
    }
    .TextContainer {
      position: absolute;
      top: 274px;
      left: 39px;
      .TextContainer_text {
        text-align: left;
        text-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
        font-size: 20px;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.9;
        letter-spacing: 0.4px;

        margin: 0;
        &:not(span) {
          color: white;
        }
        .TextContainer__span {
          color: #77d6be;
        }
      }
    }

    .RegisterFormContainer {
      .RegisterFormContainer__FormTag {
        position: relative;
        width: 80%;
        height: 100%;
      }

      .RegisterFormContainer__EmailLabel {
        color: white;
      }

      .EmailInputContainer {
        position: absolute;
        top: 449px;
        width: 100%;
        .FormContainer__EmailInput {
          background-color: rgba(255, 255, 255, 0.51);
        }
      }

      .NickNameInputContainer {
        position: absolute;
        top: $nickname-input-location;
        width: 100%;
      }
      .PWInputContainer {
        position: absolute;
        top: 300px;
        width: 100%;

        .PWInputContainer__check {
          position: relative;
          top: 1px;
        }
      }

      .RegisterFormContainer__label-darkgreen {
        color: #5fad9b;
      }

      .RegisterFormContainer__labelPassword {
        margin-top: 11px;
        text-shadow: 0 3px 6px rgba(255, 255, 255, 0.4);
        color: #5fad9b;
        margin-bottom: 0.5em;
      }

      .RegisterErrorContainer {
        height: 13%;
        color: #ff5a5a;
        text-align: left;
        font-size: 11px;
        .RegisterErrorContainer__Text {
          margin: 0;
          margin-top: 0.5em;
        }
        .RegisterErrorContainer__Text-shadow {
          text-shadow: 0px 3px 6px #000000;
        }
      }

      .RegisterFormContainer__button {
        position: absolute;
        top: 544px;
        left: 0;
        height: 46px;
      }

      .PasswordContainer {
        position: relative;
        .PWInputContainer__eyes {
          position: absolute;
          top: 0.5em;
          right: 1em;
        }
      }

      .PasswordTextBlock {
        display: flex;
        flex-direction: row;
        .PasswordTextBlock__Text {
          margin: 0;
          font-size: 9px;
        }

        .PasswordTextBlock__LeftText {
          margin-left: auto;
        }
      }

      .FinalTextContainer__Text {
        top: 451px;
        position: relative;
        margin: 0;
        font-size: 20px;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.9;
        letter-spacing: 0.4px;
        text-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
        text-align: center;
        color: #39675d;
      }
      .FinalTextContainer__Text-white {
        color: white;
        text-align: center;
        position: relative;
        top: 80vh;
      }
    }
  }
}
</style>
