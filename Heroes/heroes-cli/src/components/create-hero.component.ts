import Router from "vue-router";
import { PowerService } from "../services/power.service";
import { Country } from "../shared/country";
import { Inject } from "vue-property-decorator";
import { SearchHeroesComponent } from "./search-hero.component";
import { Hero } from "../shared/hero";
import Vue from "vue";
import Component from "vue-class-component";
import { Power } from "../shared/power";
import { CountryService } from "../services/country.service";
import { HeroService } from "../services/hero.service";

@Component({
    template: require("./create-hero.component.html")
})
export class CreateHeroComponent extends Vue {
    constructor() {
        super();
    }
    @Inject() powerService: PowerService;
    @Inject() countryService: CountryService;
    @Inject() heroService: HeroService;
    @Inject() router: Router;
    private hero: Hero = new Hero("", 0, true, "", []);

    countries: Country[] = null;
    powers: Power[] = null;

    mounted(): void {
        this.powerService.fetchPowers()
            .then((result) => {
                this.powers = result;
            })
            .catch(err => {
                alert(err);
            });
        this.countryService.fetchCountries()
            .then((result) => {
                this.countries = result;
            })
            .catch(err => {
                alert(err);
            });
    }

    submitHero(): void {
        this.heroService.postHero(this.hero)
            .then((hero: Hero) => {
                this.router.push({ path: "/" });
                alert("successfully created new hero");
            })
            .catch((err) => {
                alert(err);
            });
    }
}
