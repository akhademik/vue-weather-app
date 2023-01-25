<template>
  <div class="text-white">
    <!-- Banner -->
    <div
      v-if="preview"
      class="py-2 bg-sky-700/80">
      <h1 class="px-2 font-semibold text-center">
        You are previewing this city. Please click the '+' button to start
        tracking this city
      </h1>
    </div>

    <!-- Weather Overview -->
    <div class="max-w-2xl mx-auto">
      <div class="flex flex-col items-center justify-center pt-6">
        <h1 class="text-2xl font-semibold">{{ city }}, {{ state }}</h1>
        <p class="py-1">
          {{
            new Date(weatherData.currentTime).toLocaleDateString('en-us', {
              hour12: false,
              day: '2-digit',
              month: 'long',
            })
          }}
          -
          {{
            new Date(weatherData.currentTime).toLocaleTimeString('en-us', {
              hourCycle: 'h23',
              hour: '2-digit',
              minute: '2-digit',
            })
          }}
        </p>
        <h1 class="pt-10 pb-8 text-6xl font-bold">
          {{ Math.round(weatherData.current.temp) }}&deg;
        </h1>
        <p>Feels like {{ Math.round(weatherData.current.feels_like) }}&deg;</p>
        <p class="capitalize">
          {{ weatherData.current.weather[0].description }}
        </p>
        <img
          class="object-cover w-[150px] h-auto"
          :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`" />
      </div>
    </div>

    <hr class="border-b border-white/10" />

    <!-- Hourly Weather -->
    <div class="max-w-2xl px-4 pb-6 mx-auto font-semibold">
      <h1 class="py-4">Hourly Weather</h1>
      <div class="flex gap-10 overflow-x-scroll no-scrollbar">
        <div
          v-for="hour in weatherData.hourly"
          :key="hour.dt"
          class="flex flex-col items-center gap-4">
          <p class="whitespace-nowrap">
            {{
              new Date(hour.currentTime).toLocaleTimeString('en-us', {
                hour: 'numeric',
              })
            }}
          </p>
          <img
            :src="`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`"
            :alt="`${hour.weather[0].description}`"
            class="object-cover w-full h-full" />
          <p class="whitespace-nowrap">{{ Math.round(hour.temp) }}&deg;</p>
        </div>
      </div>
    </div>

    <hr class="border-b border-white/10" />

    <!-- Weekly Weather -->
    <div class="max-w-2xl px-4 pb-6 mx-auto font-semibold">
      <h1 class="py-4">7 Day Forecast</h1>
      <div class="gap-10 overflow-x-scroll no-scrollbar">
        <div
          class="flex items-center"
          v-for="day in weatherData.daily"
          :key="day.dt">
          <p class="flex-1">
            {{
              new Date(day.dt * 1000).toLocaleDateString('en-us', {
                weekday: 'long',
              })
            }}
          </p>
          <img
            :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
            :alt="`${day.weather[0].description}`"
            class="object-cover w-10" />
          <div class="flex justify-end flex-1">
            <p>H: {{ Math.round(day.temp.max) }}&deg;</p>
            <p>/ L: {{ Math.round(day.temp.min) }}&deg;</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import getCityWeather from '@utils/getCityWeather';

const route = useRoute();
const { city, state } = route.params;
const { lat, lon, preview } = route.query;

const getWeatherData = async () => {
  const weatherData = await getCityWeather(lat, lon);

  // cal current date & time
  const localOffset = new Date().getTimezoneOffset() * 60000;
  const utc = weatherData.data.current.dt * 1000 + localOffset;
  weatherData.data.currentTime = utc + 1000 * weatherData.data.timezone_offset;

  // cal hourly weather offset
  weatherData.data.hourly.forEach(hour => {
    const utc = hour.dt * 1000 + localOffset;
    hour.currentTime = utc + 1000 * weatherData.data.timezone_offset;
  });

  return weatherData.data;
};

const weatherData = await getWeatherData();
console.log(weatherData);
</script>
