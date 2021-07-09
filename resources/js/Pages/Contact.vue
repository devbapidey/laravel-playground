<template>
    <div class="md:mx-auto w-max mt-6">
        <form @submit.prevent="submit">
            <div class="mb-6">
                <jet-validation-errors class="mb-4" />
            </div>
            <div class="mb-3">
                <jet-label for="f_name" value="First Name"/>
                <jet-input id="f_name" type="text" v-model="form.f_name" required/>
            </div>
            <div class="mb-3">
                <jet-label for="l_name" value="Last Name"/>
                <jet-input id="l_name" type="text" v-model="form.l_name" required/>
            </div>
            <div class="mb-3">
                <jet-label for="email" value="Your Email Address"/>
                <jet-input id="email" type="email" v-model="form.email" required/>
            </div>
            <div class="mb-3">
                <jet-label for="content" value="Your Message"/>
                <textarea
                    class="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                    id="content" type="text" v-model="form.content" spellcheck="true" maxlength="100" required/>
            </div>
            <div class="">
                <jet-button>Submit</jet-button>
            </div>
            <div class="">
                <google-recaptcha-v3
                    ref="captcha"
                    :site-key="googleRecapSK"
                    hidden
                    action="contact_us"
                    @input="test"
                />
            </div>
        </form>
    </div>
</template>

<script>
import JetLabel from '@/Jetstream/Label';
import JetInput from '@/Jetstream/Input';
import JetButton from '@/Jetstream/Button';
import JetValidationErrors from '@/Jetstream/ValidationErrors';
import GoogleRecaptchaV3 from "../components/googlerecaptchav3/GoogleReCaptchaV3";
export default {
    components: {
        GoogleRecaptchaV3,
        JetLabel,
        JetInput,
        JetButton,
        JetValidationErrors,
    },
    data(){
        return {
            form: this.$inertia.form({
                f_name: '',
                l_name: '',
                email: '',
                content: '',
                gRecaptchaResponse: null,
                gRecaptchaToken: null,
            }),
            googleRecapSK: this.$page.props['googleCapSiteKey'],
        };
    },
    methods: {
        submit(){
            this.form.post(this.route('contact'), {
                onSuccess: () => {
                    this.form.reset();
                },
                onFinish: () => this.$refs.captcha.execute(),
            });
        },
        test(token){
            this.form.gRecaptchaToken = token;
        }
    },
}
</script>

<style scoped>

</style>
