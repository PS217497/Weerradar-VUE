<template>
    <div class="grid grid-cols-1 py-10">
            <h1 class="mx-auto text-2xl"><img class="m-0" :src="ikoon"/> {{ this.regio }} </h1>
            <p class="text-xl mx-auto pb-6">{{ this.zin }}</p>
        <select class="w-32 mb-6 border mx-auto" @change="selecteer($event)">
            <option v-for="(ws, index) in weerstations" :key="index">{{ ws.stationnaam['@regio'] }}</option>
        </select>
        <div class="mx-auto">
            <table v-if="this.station">
                <tbody>
                <tr>
                    <td>Tijd</td>
                    <td>{{ this.tijdstip }}</td>
                </tr>
                <tr>
                    <td>Regio</td>
                    <td>{{ this.station.stationnaam['@regio'] }}</td>
                </tr>
                <tr>
                    <td>Meetstation</td>
                    <td>{{ this.station.stationnaam['#text'] }}</td>
                </tr>
                <tr>
                    <td>Windsnelheid</td>
                    <td>{{ this.station.windsnelheidMS }} m/s</td>
                </tr>
                <tr>
                    <td>Zichtmeters</td>
                    <td>{{ this.station.zichtmeters }} m</td>
                </tr>
                <tr>
                    <td>Windstoten</td>
                    <td>{{ this.station.windstotenMS }} m/s</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="grid md:grid-cols-3 my-10">
            <div class="mx-auto" >
                <img   srcset="klein.jpg 400w, midden.jpg 800w, groot.jpg 1600w"
                       sizes="(max-width: 400px) 400px, (max-width: 800px) 800px, 1600px"
                       src="klein.jpg"
                       alt="Srcset" style="width:256px; height:auto;"/>
            </div>
            <div class="mx-auto">
                <img src="https://api.buienradar.nl/image/1.0/RadarMapNL?w=256&h=256">
            </div>
            <iframe class="mx-auto" :src="frame" scrolling=no width=256 height=256 frameborder=no></iframe>
        </div>
    </div>
    <p class="text-center">Copyright <a class="text-blue-600 underline" href="https://www.buienradar.nl">Buienradar</a></p>
</template>
<script>

import axios from "axios";

export default {
    name: 'App',
    data() {
        return {
            station: undefined,
            ikoon: "",
            tijdstip: "",
            regio: '',
            zin: '',
            frame: '',
            weerstations: []
        }
    },
    methods: {
        selecteer(selectedregion) {
            this.toon(selectedregion.target.selectedIndex)
        },
        toon: function (index) {
            this.station = this.weerstations[index]
            const d = new Date(this.station.datum);
            const options = {month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
            this.tijdstip = d.toLocaleString("nl-NL", options);
            this.regio = this.station.stationnaam['@regio']
            this.ikoon = this.station.icoonactueel['#text']
            this.zin = this.station.icoonactueel['@zin']
            this.frame = `https://gadgets.buienradar.nl/gadget/zoommap/?lat=${this.station.lat}&lng=${this.station.lon}&overname=2&zoom=8&naam=${this.regio}&size=2&voor=0`
        },
    },
    created: function () {
        axios.get('https://api.buienradar.nl/data/public/1.1/jsonfeed')
            .then(response => {
                this.weerstations = response.data.buienradarnl.weergegevens.actueel_weer.weerstations.weerstation
                this.toon(0)
            })
    }
}
</script>

<style>
</style>
