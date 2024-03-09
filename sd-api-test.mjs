const optionsJson = {
  sd_model_checkpoint: "vividorangemix_v10.safetensors [ff4725f91c]",
  sd_vae: "blessed2.vae.safetensors",
  // sd_model_checkpoint: "vividorangemix_v10NSFW.safetensors [730dd31df7]",
  // sd_vae: "blessed2.vae.safetensors",
  // sd_model_checkpoint: "calicomix_v75.safetensors [c5fc303196]",
  // sd_vae: "None",
  // sd_model_checkpoint: "calicomixFlatani_v10.safetensors [053eb3f26a]",
  // sd_vae: "None",
  outdir_txt2img_samples: "outputs/",
  do_not_show_images: true,
  live_previews_enable: false,
  // grid_save: true,
};
console.table(optionsJson);

const optionsResponse = await fetch(
  `http://192.168.10.3:7860/sdapi/v1/options`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(optionsJson),
  },
);
console.table(await optionsResponse.json());

while (true) {
  const generationResponse = fetch(
    `http://192.168.10.3:7860/sdapi/v1/txt2img`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: `
        1girl, solo, masterpiece, best quality,

        {        
        {{<lora:homura-madomagi-01:0.6>|<lora:homura-madomagi-01:0.8>},
        {purple ribbon, mahou shoujo madoka magica, akemi homura, homura akemi, purple eyes, tsurime, black hair, long hair, straight hair, hairband, black hairband, magical girl, shirt, white shirt, long sleeves, capelet, purple capelet, neck ribbon, small breasts},
        {},
        {upper body, looking at viewer},
        {0.07::blush, light smile|0.07::blush, smile, parted lips|0.07::blush, smile, half-closed eyes|0.07::blush, expressionless|0.07::blush, surprised, :o, open mouth, !|0.07::blush, nose blush, embarrassed|0.07::blush, nose blush, nervous|0.07::blush, nose blush, flustered|0.07::blush, naughty face, smile, half-closed eyes|0.07::blush, nose blush, scowl|0.03::blush, light smile, profile|0.03::blush, smile, parted lips, profile|0.03::blush, smile, half-closed eyes, profile|0.03::blush, expressionless, profile|0.03::blush, surprised, :o, open mouth, !, profile|0.03::blush, nose blush, embarrassed, profile|0.03::blush, nose blush, nervous, profile|0.03::blush, nose blush, flustered, profile|0.03::blush, naughty face, smile, half-closed eyes, profile|0.03::blush, nose blush, scowl, profile},
        {outdoors, garden}|
        {<lora:homura-madomagi-01:0.6>|<lora:homura-madomagi-01:0.8>},
        {purple ribbon, mahou shoujo madoka magica, akemi homura, homura akemi, purple eyes, tsurime, black hair, long hair, straight hair, hairband, black hairband, magical girl, shirt, white shirt, long sleeves, capelet, purple capelet, neck ribbon, small breasts, skirt, purple skirt, miniskirt, pleated skirt, frilled skirt},
        {},
        {cowboy shot, looking at viewer},
        {0.07::blush, light smile|0.07::blush, smile, parted lips|0.07::blush, smile, half-closed eyes|0.07::blush, expressionless|0.07::blush, surprised, :o, open mouth, !|0.07::blush, nose blush, embarrassed|0.07::blush, nose blush, nervous|0.07::blush, nose blush, flustered|0.07::blush, naughty face, smile, half-closed eyes|0.07::blush, nose blush, scowl|0.03::blush, light smile, profile|0.03::blush, smile, parted lips, profile|0.03::blush, smile, half-closed eyes, profile|0.03::blush, expressionless, profile|0.03::blush, surprised, :o, open mouth, !, profile|0.03::blush, nose blush, embarrassed, profile|0.03::blush, nose blush, nervous, profile|0.03::blush, nose blush, flustered, profile|0.03::blush, naughty face, smile, half-closed eyes, profile|0.03::blush, nose blush, scowl, profile},
        {outdoors, garden}|
        {<lora:homura-madomagi-01:0.6>|<lora:homura-madomagi-01:0.8>},
        {purple ribbon, mahou shoujo madoka magica, akemi homura, homura akemi, purple eyes, tsurime, black hair, long hair, straight hair, hairband, black hairband, magical girl, shirt, white shirt, long sleeves, capelet, purple capelet, neck ribbon, small breasts, skirt, purple skirt, miniskirt, pleated skirt, frilled skirt, boots, black footwear, high heels, high heel boots, argyle, argyle legwear},
        {all fours, looking at viewer, breasts},
        {0.08::blush, light smile|0.08::blush, smile, parted lips|0.08::blush, smile, half-closed eyes|0.08::blush, expressionless|0.08::blush, surprised, :o, open mouth, !|0.08::blush, nose blush, embarrassed|0.08::blush, nose blush, nervous|0.08::blush, nose blush, flustered|0.08::blush, naughty face, smile, half-closed eyes|0.08::blush, nose blush, scowl|0.02::blush, light smile, profile|0.02::blush, smile, parted lips, profile|0.02::blush, smile, half-closed eyes, profile|0.02::blush, expressionless, profile|0.02::blush, surprised, :o, open mouth, !, profile|0.02::blush, nose blush, embarrassed, profile|0.02::blush, nose blush, nervous, profile|0.02::blush, nose blush, flustered, profile|0.02::blush, naughty face, smile, half-closed eyes, profile|0.02::blush, nose blush, scowl, profile},
        {0.5::simple background, white background, heart background, heart, spoken heart|0.5::simple background, white background}|
        {<lora:homura-madomagi-01:0.6>|<lora:homura-madomagi-01:0.8>},
        {purple ribbon, mahou shoujo madoka magica, akemi homura, homura akemi, purple eyes, tsurime, black hair, long hair, straight hair, hairband, black hairband, magical girl, shirt, white shirt, long sleeves, capelet, purple capelet, small breasts, skirt, purple skirt, miniskirt, pleated skirt, frilled skirt, boots, black footwear, high heels, high heel boots, argyle, argyle legwear},
        {all fours, looking at viewer, from behind, looking back, ass},
        {0.05::blush, light smile|0.05::blush, smile, parted lips|0.05::blush, smile, half-closed eyes|0.05::blush, expressionless|0.05::blush, surprised, :o, open mouth, !|0.05::blush, nose blush, embarrassed|0.05::blush, nose blush, nervous|0.05::blush, nose blush, flustered|0.05::blush, naughty face, smile, half-closed eyes|0.05::blush, nose blush, scowl|0.05::blush, light smile, profile|0.05::blush, smile, parted lips, profile|0.05::blush, smile, half-closed eyes, profile|0.05::blush, expressionless, profile|0.05::blush, surprised, :o, open mouth, !, profile|0.05::blush, nose blush, embarrassed, profile|0.05::blush, nose blush, nervous, profile|0.05::blush, nose blush, flustered, profile|0.05::blush, naughty face, smile, half-closed eyes, profile|0.05::blush, nose blush, scowl, profile},
        {0.5::panties under pantyhose, underwear, panties, crotch seam, upskirt|0.5::},
        {0.5::simple background, white background, heart background, heart, spoken heart|0.5::simple background, white background}|
        {<lora:homura-madomagi-01:0.6>|<lora:homura-madomagi-01:0.8>},
        {purple ribbon, mahou shoujo madoka magica, akemi homura, homura akemi, purple eyes, tsurime, black hair, long hair, straight hair, hairband, black hairband, magical girl, shirt, white shirt, long sleeves, capelet, purple capelet, small breasts, skirt, purple skirt, miniskirt, pleated skirt, frilled skirt, no shoes},
        {all fours, looking at viewer, from behind, looking back, ass, on bed},
        {0.05::blush, light smile|0.05::blush, smile, parted lips|0.05::blush, smile, half-closed eyes|0.05::blush, expressionless|0.05::blush, surprised, :o, open mouth, !|0.05::blush, nose blush, embarrassed|0.05::blush, nose blush, nervous|0.05::blush, nose blush, flustered|0.05::blush, naughty face, smile, half-closed eyes|0.05::blush, nose blush, scowl|0.05::blush, light smile, profile|0.05::blush, smile, parted lips, profile|0.05::blush, smile, half-closed eyes, profile|0.05::blush, expressionless, profile|0.05::blush, surprised, :o, open mouth, !, profile|0.05::blush, nose blush, embarrassed, profile|0.05::blush, nose blush, nervous, profile|0.05::blush, nose blush, flustered, profile|0.05::blush, naughty face, smile, half-closed eyes, profile|0.05::blush, nose blush, scowl, profile},
        {0.5::panties under pantyhose, underwear, panties, crotch seam, upskirt|0.5::},
        {0.5::indoors, bed sheet, lamp|0.5::indoors, bed sheet, pillow}|
        {<lora:homura-madomagi-01:0.6>|<lora:homura-madomagi-01:0.8>},
        {purple ribbon, mahou shoujo madoka magica, akemi homura, homura akemi, purple eyes, tsurime, black hair, long hair, straight hair, hairband, black hairband, magical girl, shirt, white shirt, long sleeves, capelet, purple capelet, neck ribbon, small breasts},
        {portrait, lying, looking at viewer, on back, on bed},
        {0.1::blush, light smile|0.1::blush, smile, parted lips|0.1::blush, smile, half-closed eyes|0.1::blush, expressionless|0.1::blush, surprised, :o, open mouth, !|0.1::blush, nose blush, embarrassed|0.1::blush, nose blush, nervous|0.1::blush, nose blush, flustered|0.1::blush, naughty face, smile, half-closed eyes|0.1::blush, nose blush, scowl},
        {0.5::bed sheet|0.5::bed sheet, pillow}|
        {<lora:homura-madomagi-01:0.6>|<lora:homura-madomagi-01:0.8>},
        {purple ribbon, mahou shoujo madoka magica, akemi homura, homura akemi, purple eyes, tsurime, black hair, long hair, straight hair, hairband, black hairband, magical girl, shirt, white shirt, long sleeves, capelet, purple capelet, neck ribbon, small breasts},
        {upper body, lying, looking at viewer, on back, on bed},
        {0.1::blush, light smile|0.1::blush, smile, parted lips|0.1::blush, smile, half-closed eyes|0.1::blush, expressionless|0.1::blush, surprised, :o, open mouth, !|0.1::blush, nose blush, embarrassed|0.1::blush, nose blush, nervous|0.1::blush, nose blush, flustered|0.1::blush, naughty face, smile, half-closed eyes|0.1::blush, nose blush, scowl},
        {0.5::bed sheet|0.5::bed sheet, pillow}|
        {<lora:homura-madomagi-01:0.6>|<lora:homura-madomagi-01:0.8>},
        {purple ribbon, mahou shoujo madoka magica, akemi homura, homura akemi, purple eyes, tsurime, black hair, long hair, straight hair, hairband, black hairband, magical girl, shirt, white shirt, long sleeves, capelet, purple capelet, neck ribbon, small breasts, skirt, purple skirt, miniskirt, pleated skirt, frilled skirt},
        {panties under pantyhose, underwear, panties, crotch seam, upskirt, clothes lift, skirt lift},
        {cowboy shot, lying, looking at viewer, on back, on bed},
        {0.1::blush, light smile|0.1::blush, smile, parted lips|0.1::blush, smile, half-closed eyes|0.1::blush, expressionless|0.1::blush, surprised, :o, open mouth, !|0.1::blush, nose blush, embarrassed|0.1::blush, nose blush, nervous|0.1::blush, nose blush, flustered|0.1::blush, naughty face, smile, half-closed eyes|0.1::blush, nose blush, scowl},
        {0.5::bed sheet|0.5::bed sheet, pillow}|
        {<lora:homura-madomagi-01:0.6>|<lora:homura-madomagi-01:0.8>},
        {purple ribbon, mahou shoujo madoka magica, akemi homura, homura akemi, purple eyes, tsurime, black hair, long hair, straight hair, hairband, black hairband, magical girl, shirt, white shirt, long sleeves, capelet, purple capelet, neck ribbon, small breasts, skirt, purple skirt, miniskirt, pleated skirt, frilled skirt},
        {cowboy shot, leaning forward, v arms, from above, looking up, looking at viewer},
        {0.1::blush, light smile|0.1::blush, smile, parted lips|0.1::blush, smile, half-closed eyes|0.1::blush, expressionless|0.1::blush, surprised, :o, open mouth, !|0.1::blush, nose blush, embarrassed|0.1::blush, nose blush, nervous|0.1::blush, nose blush, flustered|0.1::blush, naughty face, smile, half-closed eyes|0.1::blush, nose blush, scowl},
        {indoors, wooden floor}|
        {<lora:homura-madomagi-01:0.6>|<lora:homura-madomagi-01:0.8>},
        {purple ribbon, mahou shoujo madoka magica, akemi homura, homura akemi, purple eyes, tsurime, black hair, long hair, straight hair, hairband, black hairband, magical girl, shirt, white shirt, long sleeves, capelet, purple capelet, neck ribbon, small breasts, skirt, purple skirt, miniskirt, pleated skirt, frilled skirt, boots, black footwear, high heels, high heel boots, argyle, argyle legwear},
        {wariza, sitting, hands on lap, from above, looking up, looking at viewer},
        {0.1::blush, light smile|0.1::blush, smile, parted lips|0.1::blush, smile, half-closed eyes|0.1::blush, expressionless|0.1::blush, surprised, :o, open mouth, !|0.1::blush, nose blush, embarrassed|0.1::blush, nose blush, nervous|0.1::blush, nose blush, flustered|0.1::blush, naughty face, smile, half-closed eyes|0.1::blush, nose blush, scowl},
        {indoors, wooden floor}|
        {<lora:homura-madomagi-01:0.6>|<lora:homura-madomagi-01:0.8>},
        {purple ribbon, mahou shoujo madoka magica, akemi homura, homura akemi, purple eyes, tsurime, black hair, long hair, straight hair, hairband, black hairband, magical girl, shirt, white shirt, long sleeves, capelet, purple capelet, neck ribbon, small breasts, skirt, purple skirt, miniskirt, pleated skirt, frilled skirt},
        {cowboy shot, contrapposto, looking at viewer},
        {0.1::blush, light smile|0.1::blush, smile, parted lips|0.1::blush, smile, half-closed eyes|0.1::blush, expressionless|0.1::blush, surprised, :o, open mouth, !|0.1::blush, nose blush, embarrassed|0.1::blush, nose blush, nervous|0.1::blush, nose blush, flustered|0.1::blush, naughty face, smile, half-closed eyes|0.1::blush, nose blush, scowl},
        {outdoors, garden}|
        {<lora:homura-madomagi-01:0.6>|<lora:homura-madomagi-01:0.8>},
        {purple ribbon, mahou shoujo madoka magica, akemi homura, homura akemi, purple eyes, tsurime, black hair, long hair, straight hair, hairband, black hairband, magical girl, shirt, white shirt, long sleeves, capelet, purple capelet, neck ribbon, small breasts, skirt, purple skirt, miniskirt, pleated skirt, frilled skirt},
        {cowboy shot, contrapposto, looking at viewer, arms up},
        {0.1::blush, light smile|0.1::blush, smile, parted lips|0.1::blush, smile, half-closed eyes|0.1::blush, expressionless|0.1::blush, surprised, :o, open mouth, !|0.1::blush, nose blush, embarrassed|0.1::blush, nose blush, nervous|0.1::blush, nose blush, flustered|0.1::blush, naughty face, smile, half-closed eyes|0.1::blush, nose blush, scowl},
        {outdoors, garden}|
        {<lora:homura-madomagi-01:0.6>|<lora:homura-madomagi-01:0.8>},
        {purple ribbon, mahou shoujo madoka magica, akemi homura, homura akemi, purple eyes, tsurime, black hair, long hair, straight hair, hairband, black hairband, magical girl, shirt, white shirt, long sleeves, capelet, purple capelet, neck ribbon, small breasts, skirt, purple skirt, miniskirt, pleated skirt, frilled skirt},
        {cowboy shot, twisted torso, looking back},
        {0.1::blush, light smile|0.1::blush, smile, parted lips|0.1::blush, smile, half-closed eyes|0.1::blush, expressionless|0.1::blush, surprised, :o, open mouth, !|0.1::blush, nose blush, embarrassed|0.1::blush, nose blush, nervous|0.1::blush, nose blush, flustered|0.1::blush, naughty face, smile, half-closed eyes|0.1::blush, nose blush, scowl},
        {outdoors, garden}|
        {<lora:homura-madomagi-01:0.6>|<lora:homura-madomagi-01:0.8>},
        {purple ribbon, mahou shoujo madoka magica, akemi homura, homura akemi, purple eyes, tsurime, black hair, long hair, straight hair, hairband, black hairband, magical girl, shirt, white shirt, long sleeves, capelet, purple capelet, neck ribbon, small breasts, skirt, purple skirt, miniskirt, pleated skirt, frilled skirt},
        {sitting, spread legs, looking at viewer},
        {panties under pantyhose, underwear, panties, crotch seam, upskirt},
        {0.1::blush, light smile|0.1::blush, smile, parted lips|0.1::blush, smile, half-closed eyes|0.1::blush, expressionless|0.1::blush, surprised, :o, open mouth, !|0.1::blush, nose blush, embarrassed|0.1::blush, nose blush, nervous|0.1::blush, nose blush, flustered|0.1::blush, naughty face, smile, half-closed eyes|0.1::blush, nose blush, scowl},
        {0.5::simple background, white background, heart background, heart, spoken heart|0.5::simple background, white background}|
        {<lora:homura-madomagi-01:0.6>|<lora:homura-madomagi-01:0.8>},
        {purple ribbon, mahou shoujo madoka magica, akemi homura, homura akemi, purple eyes, tsurime, black hair, long hair, straight hair, hairband, black hairband, magical girl, shirt, white shirt, long sleeves, capelet, purple capelet, neck ribbon, small breasts, skirt, purple skirt, miniskirt, pleated skirt, frilled skirt, boots, black footwear, high heels, high heel boots, argyle, argyle legwear},
        {lying, on side, ass focus, foreshortening, looking at viewer},
        {panties under pantyhose, underwear, panties, crotch seam, upskirt},
        {0.1::blush, light smile|0.1::blush, smile, parted lips|0.1::blush, smile, half-closed eyes|0.1::blush, expressionless|0.1::blush, surprised, :o, open mouth, !|0.1::blush, nose blush, embarrassed|0.1::blush, nose blush, nervous|0.1::blush, nose blush, flustered|0.1::blush, naughty face, smile, half-closed eyes|0.1::blush, nose blush, scowl},
        {0.5::outdoors, grass|0.5::outdoors, partially submerged, wet}|
        {<lora:homura-madomagi-01:0.6>|<lora:homura-madomagi-01:0.8>},
        {purple ribbon, mahou shoujo madoka magica, akemi homura, homura akemi, purple eyes, tsurime, black hair, long hair, straight hair, hairband, black hairband, magical girl, shirt, white shirt, long sleeves, capelet, purple capelet, neck ribbon, small breasts, skirt, purple skirt, miniskirt, pleated skirt, frilled skirt, boots, black footwear, high heels, high heel boots, argyle, argyle legwear},
        {squatting, hands on own knees, looking at viewer},
        {panties under pantyhose, underwear, panties, crotch seam, upskirt},
        {0.1::blush, light smile|0.1::blush, smile, parted lips|0.1::blush, smile, half-closed eyes|0.1::blush, expressionless|0.1::blush, surprised, :o, open mouth, !|0.1::blush, nose blush, embarrassed|0.1::blush, nose blush, nervous|0.1::blush, nose blush, flustered|0.1::blush, naughty face, smile, half-closed eyes|0.1::blush, nose blush, scowl},
        {0.5::simple background, white background, heart background, heart, spoken heart|0.5::simple background, white background}}
        |
        {{<lora:homura-madomagi-01:0.6>|<lora:homura-madomagi-01:0.8>},
        {mitakihara school uniform, mahou shoujo madoka magica, akemi homura, homura akemi, purple eyes, tsurime, black hair, long hair, straight hair, hairband, black hairband, school uniform, puffy sleeves, juliet sleeves, bowtie, red bowtie, yellow sweater, collared shirt, white shirt, small breasts},
        {},
        {upper body, looking at viewer},
        {0.07::blush, light smile|0.07::blush, smile, parted lips|0.07::blush, smile, half-closed eyes|0.07::blush, expressionless|0.07::blush, surprised, :o, open mouth, !|0.07::blush, nose blush, embarrassed|0.07::blush, nose blush, nervous|0.07::blush, nose blush, flustered|0.07::blush, naughty face, smile, half-closed eyes|0.07::blush, nose blush, scowl|0.03::blush, light smile, profile|0.03::blush, smile, parted lips, profile|0.03::blush, smile, half-closed eyes, profile|0.03::blush, expressionless, profile|0.03::blush, surprised, :o, open mouth, !, profile|0.03::blush, nose blush, embarrassed, profile|0.03::blush, nose blush, nervous, profile|0.03::blush, nose blush, flustered, profile|0.03::blush, naughty face, smile, half-closed eyes, profile|0.03::blush, nose blush, scowl, profile},
        {0.5::indoors, window|0.5::indoors, classroom}|
        {<lora:homura-madomagi-01:0.6>|<lora:homura-madomagi-01:0.8>},
        {mitakihara school uniform, mahou shoujo madoka magica, akemi homura, homura akemi, purple eyes, tsurime, black hair, long hair, straight hair, hairband, black hairband, school uniform, puffy sleeves, juliet sleeves, bowtie, red bowtie, yellow sweater, collared shirt, white shirt, small breasts, skirt, black skirt, plaid skirt, miniskirt, pantyhose, black pantyhose},
        {},
        {cowboy shot, looking at viewer},
        {0.07::blush, light smile|0.07::blush, smile, parted lips|0.07::blush, smile, half-closed eyes|0.07::blush, expressionless|0.07::blush, surprised, :o, open mouth, !|0.07::blush, nose blush, embarrassed|0.07::blush, nose blush, nervous|0.07::blush, nose blush, flustered|0.07::blush, naughty face, smile, half-closed eyes|0.07::blush, nose blush, scowl|0.03::blush, light smile, profile|0.03::blush, smile, parted lips, profile|0.03::blush, smile, half-closed eyes, profile|0.03::blush, expressionless, profile|0.03::blush, surprised, :o, open mouth, !, profile|0.03::blush, nose blush, embarrassed, profile|0.03::blush, nose blush, nervous, profile|0.03::blush, nose blush, flustered, profile|0.03::blush, naughty face, smile, half-closed eyes, profile|0.03::blush, nose blush, scowl, profile},
        {0.5::indoors, window|0.5::indoors, classroom}|
        {<lora:homura-madomagi-01:0.6>|<lora:homura-madomagi-01:0.8>},
        {mitakihara school uniform, mahou shoujo madoka magica, akemi homura, homura akemi, purple eyes, tsurime, black hair, long hair, straight hair, hairband, black hairband, school uniform, puffy sleeves, juliet sleeves, bowtie, red bowtie, yellow sweater, collared shirt, white shirt, small breasts, skirt, black skirt, plaid skirt, miniskirt, pantyhose, black pantyhose, loafers},
        {all fours, looking at viewer, breasts},
        {0.08::blush, light smile|0.08::blush, smile, parted lips|0.08::blush, smile, half-closed eyes|0.08::blush, expressionless|0.08::blush, surprised, :o, open mouth, !|0.08::blush, nose blush, embarrassed|0.08::blush, nose blush, nervous|0.08::blush, nose blush, flustered|0.08::blush, naughty face, smile, half-closed eyes|0.08::blush, nose blush, scowl|0.02::blush, light smile, profile|0.02::blush, smile, parted lips, profile|0.02::blush, smile, half-closed eyes, profile|0.02::blush, expressionless, profile|0.02::blush, surprised, :o, open mouth, !, profile|0.02::blush, nose blush, embarrassed, profile|0.02::blush, nose blush, nervous, profile|0.02::blush, nose blush, flustered, profile|0.02::blush, naughty face, smile, half-closed eyes, profile|0.02::blush, nose blush, scowl, profile},
        {0.333333::simple background, white background, heart background, heart, spoken heart|0.333333::simple background, white background|0.333333::simple background, pink background}|
        {<lora:homura-madomagi-01:0.6>|<lora:homura-madomagi-01:0.8>},
        {mitakihara school uniform, mahou shoujo madoka magica, akemi homura, homura akemi, purple eyes, tsurime, black hair, long hair, straight hair, hairband, black hairband, school uniform, puffy sleeves, juliet sleeves, yellow sweater, collared shirt, white shirt, small breasts, skirt, black skirt, plaid skirt, miniskirt, pantyhose, black pantyhose, loafers},
        {all fours, looking at viewer, from behind, looking back, ass},
        {0.05::blush, light smile|0.05::blush, smile, parted lips|0.05::blush, smile, half-closed eyes|0.05::blush, expressionless|0.05::blush, surprised, :o, open mouth, !|0.05::blush, nose blush, embarrassed|0.05::blush, nose blush, nervous|0.05::blush, nose blush, flustered|0.05::blush, naughty face, smile, half-closed eyes|0.05::blush, nose blush, scowl|0.05::blush, light smile, profile|0.05::blush, smile, parted lips, profile|0.05::blush, smile, half-closed eyes, profile|0.05::blush, expressionless, profile|0.05::blush, surprised, :o, open mouth, !, profile|0.05::blush, nose blush, embarrassed, profile|0.05::blush, nose blush, nervous, profile|0.05::blush, nose blush, flustered, profile|0.05::blush, naughty face, smile, half-closed eyes, profile|0.05::blush, nose blush, scowl, profile},
        {0.5::panties under pantyhose, underwear, panties, crotch seam, upskirt|0.5::},
        {0.333333::simple background, white background, heart background, heart, spoken heart|0.333333::simple background, white background|0.333333::simple background, pink background}|
        {<lora:homura-madomagi-01:0.6>|<lora:homura-madomagi-01:0.8>},
        {mitakihara school uniform, mahou shoujo madoka magica, akemi homura, homura akemi, purple eyes, tsurime, black hair, long hair, straight hair, hairband, black hairband, school uniform, puffy sleeves, juliet sleeves, yellow sweater, collared shirt, white shirt, small breasts, skirt, black skirt, plaid skirt, miniskirt, pantyhose, black pantyhose, no shoes},
        {all fours, looking at viewer, from behind, looking back, ass, on bed},
        {0.05::blush, light smile|0.05::blush, smile, parted lips|0.05::blush, smile, half-closed eyes|0.05::blush, expressionless|0.05::blush, surprised, :o, open mouth, !|0.05::blush, nose blush, embarrassed|0.05::blush, nose blush, nervous|0.05::blush, nose blush, flustered|0.05::blush, naughty face, smile, half-closed eyes|0.05::blush, nose blush, scowl|0.05::blush, light smile, profile|0.05::blush, smile, parted lips, profile|0.05::blush, smile, half-closed eyes, profile|0.05::blush, expressionless, profile|0.05::blush, surprised, :o, open mouth, !, profile|0.05::blush, nose blush, embarrassed, profile|0.05::blush, nose blush, nervous, profile|0.05::blush, nose blush, flustered, profile|0.05::blush, naughty face, smile, half-closed eyes, profile|0.05::blush, nose blush, scowl, profile},
        {0.5::panties under pantyhose, underwear, panties, crotch seam, upskirt|0.5::},
        {0.5::indoors, bed sheet, lamp|0.5::indoors, bed sheet, pillow}|
        {<lora:homura-madomagi-01:0.6>|<lora:homura-madomagi-01:0.8>},
        {mitakihara school uniform, mahou shoujo madoka magica, akemi homura, homura akemi, purple eyes, tsurime, black hair, long hair, straight hair, hairband, black hairband, school uniform, puffy sleeves, juliet sleeves, bowtie, red bowtie, yellow sweater, collared shirt, white shirt, small breasts},
        {portrait, lying, looking at viewer, on back, on bed},
        {0.1::blush, light smile|0.1::blush, smile, parted lips|0.1::blush, smile, half-closed eyes|0.1::blush, expressionless|0.1::blush, surprised, :o, open mouth, !|0.1::blush, nose blush, embarrassed|0.1::blush, nose blush, nervous|0.1::blush, nose blush, flustered|0.1::blush, naughty face, smile, half-closed eyes|0.1::blush, nose blush, scowl},
        {0.5::bed sheet|0.5::bed sheet, pillow}|
        {<lora:homura-madomagi-01:0.6>|<lora:homura-madomagi-01:0.8>},
        {mitakihara school uniform, mahou shoujo madoka magica, akemi homura, homura akemi, purple eyes, tsurime, black hair, long hair, straight hair, hairband, black hairband, school uniform, puffy sleeves, juliet sleeves, bowtie, red bowtie, yellow sweater, collared shirt, white shirt, small breasts},
        {upper body, lying, looking at viewer, on back, on bed},
        {0.1::blush, light smile|0.1::blush, smile, parted lips|0.1::blush, smile, half-closed eyes|0.1::blush, expressionless|0.1::blush, surprised, :o, open mouth, !|0.1::blush, nose blush, embarrassed|0.1::blush, nose blush, nervous|0.1::blush, nose blush, flustered|0.1::blush, naughty face, smile, half-closed eyes|0.1::blush, nose blush, scowl},
        {0.5::bed sheet|0.5::bed sheet, pillow}|
        {<lora:homura-madomagi-01:0.6>|<lora:homura-madomagi-01:0.8>},
        {mitakihara school uniform, mahou shoujo madoka magica, akemi homura, homura akemi, purple eyes, tsurime, black hair, long hair, straight hair, hairband, black hairband, school uniform, puffy sleeves, juliet sleeves, bowtie, red bowtie, yellow sweater, collared shirt, white shirt, small breasts, skirt, black skirt, plaid skirt, miniskirt, pantyhose, black pantyhose},
        {panties under pantyhose, underwear, panties, crotch seam, upskirt, clothes lift, skirt lift},
        {cowboy shot, lying, looking at viewer, on back, on bed},
        {0.1::blush, light smile|0.1::blush, smile, parted lips|0.1::blush, smile, half-closed eyes|0.1::blush, expressionless|0.1::blush, surprised, :o, open mouth, !|0.1::blush, nose blush, embarrassed|0.1::blush, nose blush, nervous|0.1::blush, nose blush, flustered|0.1::blush, naughty face, smile, half-closed eyes|0.1::blush, nose blush, scowl},
        {0.5::bed sheet|0.5::bed sheet, pillow}|
        {<lora:homura-madomagi-01:0.6>|<lora:homura-madomagi-01:0.8>},
        {mitakihara school uniform, mahou shoujo madoka magica, akemi homura, homura akemi, purple eyes, tsurime, black hair, long hair, straight hair, hairband, black hairband, school uniform, puffy sleeves, juliet sleeves, bowtie, red bowtie, yellow sweater, collared shirt, white shirt, small breasts, skirt, black skirt, plaid skirt, miniskirt, pantyhose, black pantyhose},
        {cowboy shot, leaning forward, v arms, from above, looking up, looking at viewer},
        {0.1::blush, light smile|0.1::blush, smile, parted lips|0.1::blush, smile, half-closed eyes|0.1::blush, expressionless|0.1::blush, surprised, :o, open mouth, !|0.1::blush, nose blush, embarrassed|0.1::blush, nose blush, nervous|0.1::blush, nose blush, flustered|0.1::blush, naughty face, smile, half-closed eyes|0.1::blush, nose blush, scowl},
        {0.5::indoors, wooden floor|0.5::simple background, white background, heart background, heart, spoken heart}|
        {<lora:homura-madomagi-01:0.6>|<lora:homura-madomagi-01:0.8>},
        {mitakihara school uniform, mahou shoujo madoka magica, akemi homura, homura akemi, purple eyes, tsurime, black hair, long hair, straight hair, hairband, black hairband, school uniform, puffy sleeves, juliet sleeves, bowtie, red bowtie, yellow sweater, collared shirt, white shirt, small breasts, skirt, black skirt, plaid skirt, miniskirt, pantyhose, black pantyhose, loafers},
        {wariza, sitting, hands on lap, from above, looking up, looking at viewer},
        {0.1::blush, light smile|0.1::blush, smile, parted lips|0.1::blush, smile, half-closed eyes|0.1::blush, expressionless|0.1::blush, surprised, :o, open mouth, !|0.1::blush, nose blush, embarrassed|0.1::blush, nose blush, nervous|0.1::blush, nose blush, flustered|0.1::blush, naughty face, smile, half-closed eyes|0.1::blush, nose blush, scowl},
        {0.5::indoors, wooden floor|0.5::simple background, white background, heart background, heart, spoken heart}|
        {<lora:homura-madomagi-01:0.6>|<lora:homura-madomagi-01:0.8>},
        {mitakihara school uniform, mahou shoujo madoka magica, akemi homura, homura akemi, purple eyes, tsurime, black hair, long hair, straight hair, hairband, black hairband, school uniform, puffy sleeves, juliet sleeves, bowtie, red bowtie, yellow sweater, collared shirt, white shirt, small breasts, skirt, black skirt, plaid skirt, miniskirt, pantyhose, black pantyhose},
        {cowboy shot, contrapposto, looking at viewer},
        {0.1::blush, light smile|0.1::blush, smile, parted lips|0.1::blush, smile, half-closed eyes|0.1::blush, expressionless|0.1::blush, surprised, :o, open mouth, !|0.1::blush, nose blush, embarrassed|0.1::blush, nose blush, nervous|0.1::blush, nose blush, flustered|0.1::blush, naughty face, smile, half-closed eyes|0.1::blush, nose blush, scowl},
        {0.5::indoors, window|0.5::indoors, classroom}|
        {<lora:homura-madomagi-01:0.6>|<lora:homura-madomagi-01:0.8>},
        {mitakihara school uniform, mahou shoujo madoka magica, akemi homura, homura akemi, purple eyes, tsurime, black hair, long hair, straight hair, hairband, black hairband, school uniform, puffy sleeves, juliet sleeves, bowtie, red bowtie, yellow sweater, collared shirt, white shirt, small breasts, skirt, black skirt, plaid skirt, miniskirt, pantyhose, black pantyhose},
        {cowboy shot, contrapposto, looking at viewer, arms up},
        {0.1::blush, light smile|0.1::blush, smile, parted lips|0.1::blush, smile, half-closed eyes|0.1::blush, expressionless|0.1::blush, surprised, :o, open mouth, !|0.1::blush, nose blush, embarrassed|0.1::blush, nose blush, nervous|0.1::blush, nose blush, flustered|0.1::blush, naughty face, smile, half-closed eyes|0.1::blush, nose blush, scowl},
        {0.5::indoors, window|0.5::indoors, classroom}|
        {<lora:homura-madomagi-01:0.6>|<lora:homura-madomagi-01:0.8>},
        {mitakihara school uniform, mahou shoujo madoka magica, akemi homura, homura akemi, purple eyes, tsurime, black hair, long hair, straight hair, hairband, black hairband, school uniform, puffy sleeves, juliet sleeves, bowtie, red bowtie, yellow sweater, collared shirt, white shirt, small breasts, skirt, black skirt, plaid skirt, miniskirt, pantyhose, black pantyhose},
        {cowboy shot, twisted torso, looking back},
        {0.1::blush, light smile|0.1::blush, smile, parted lips|0.1::blush, smile, half-closed eyes|0.1::blush, expressionless|0.1::blush, surprised, :o, open mouth, !|0.1::blush, nose blush, embarrassed|0.1::blush, nose blush, nervous|0.1::blush, nose blush, flustered|0.1::blush, naughty face, smile, half-closed eyes|0.1::blush, nose blush, scowl},
        {0.5::indoors, window|0.5::indoors, classroom}|
        {<lora:homura-madomagi-01:0.6>|<lora:homura-madomagi-01:0.8>},
        {mitakihara school uniform, mahou shoujo madoka magica, akemi homura, homura akemi, purple eyes, tsurime, black hair, long hair, straight hair, hairband, black hairband, school uniform, puffy sleeves, juliet sleeves, bowtie, red bowtie, yellow sweater, collared shirt, white shirt, small breasts, skirt, black skirt, plaid skirt, miniskirt, pantyhose, black pantyhose},
        {sitting, spread legs, looking at viewer},
        {panties under pantyhose, underwear, panties, crotch seam, upskirt},
        {0.1::blush, light smile|0.1::blush, smile, parted lips|0.1::blush, smile, half-closed eyes|0.1::blush, expressionless|0.1::blush, surprised, :o, open mouth, !|0.1::blush, nose blush, embarrassed|0.1::blush, nose blush, nervous|0.1::blush, nose blush, flustered|0.1::blush, naughty face, smile, half-closed eyes|0.1::blush, nose blush, scowl},
        {0.333333::simple background, white background, heart background, heart, spoken heart|0.333333::simple background, white background|0.333333::simple background, pink background}|
        {<lora:homura-madomagi-01:0.6>|<lora:homura-madomagi-01:0.8>},
        {mitakihara school uniform, mahou shoujo madoka magica, akemi homura, homura akemi, purple eyes, tsurime, black hair, long hair, straight hair, hairband, black hairband, school uniform, puffy sleeves, juliet sleeves, bowtie, red bowtie, yellow sweater, collared shirt, white shirt, small breasts, skirt, black skirt, plaid skirt, miniskirt, pantyhose, black pantyhose, loafers},
        {lying, on side, ass focus, foreshortening, looking at viewer},
        {panties under pantyhose, underwear, panties, crotch seam, upskirt},
        {0.1::blush, light smile|0.1::blush, smile, parted lips|0.1::blush, smile, half-closed eyes|0.1::blush, expressionless|0.1::blush, surprised, :o, open mouth, !|0.1::blush, nose blush, embarrassed|0.1::blush, nose blush, nervous|0.1::blush, nose blush, flustered|0.1::blush, naughty face, smile, half-closed eyes|0.1::blush, nose blush, scowl},
        {outdoors, grass}|
        {<lora:homura-madomagi-01:0.6>|<lora:homura-madomagi-01:0.8>},
        {mitakihara school uniform, mahou shoujo madoka magica, akemi homura, homura akemi, purple eyes, tsurime, black hair, long hair, straight hair, hairband, black hairband, school uniform, puffy sleeves, juliet sleeves, bowtie, red bowtie, yellow sweater, collared shirt, white shirt, small breasts, skirt, black skirt, plaid skirt, miniskirt, pantyhose, black pantyhose, loafers},
        {squatting, hands on own knees, looking at viewer},
        {panties under pantyhose, underwear, panties, crotch seam, upskirt},
        {0.1::blush, light smile|0.1::blush, smile, parted lips|0.1::blush, smile, half-closed eyes|0.1::blush, expressionless|0.1::blush, surprised, :o, open mouth, !|0.1::blush, nose blush, embarrassed|0.1::blush, nose blush, nervous|0.1::blush, nose blush, flustered|0.1::blush, naughty face, smile, half-closed eyes|0.1::blush, nose blush, scowl},
        {0.333333::simple background, white background, heart background, heart, spoken heart|0.333333::simple background, white background|0.333333::simple background, pink background}}
        }
        `,
        negative_prompt:
          "verybadimagenegative_v1.3, (cameltoe, black background, loli, top-down bottom-up:1.5)",
        seed: -1,
        sampler_name: "Restart",
        batch_size: 1,
        steps: 40,
        cfg_scale: 5,
        width: 512,
        height: 768,
        denoising_strength: 0.4,
        enable_hr: true,
        hr_scale: 2.5,
        hr_upscaler: "4x-AnimeSharp",
        hr_second_pass_steps: 30,
        send_images: false,
        save_images: true,
        alwayson_scripts: {
          cutoff: {
            args: [
              true,
              "red,pink,orange,yellow,green,blue,purple,black,white,brown,grey,blonde",
              1.5,
              false,
              false,
              "",
              "Lerp",
              true,
            ],
          },
        },
      }),
    },
  );

  const intervalID = setInterval(async () => {
    const response = await fetch(`http://192.168.10.3:7860/sdapi/v1/progress`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.table({
      progress: json.progress,
      eta_relative: json.eta_relative,
    });
  }, 10000);

  console.log(await (await generationResponse).json());
  clearInterval(intervalID);
}
