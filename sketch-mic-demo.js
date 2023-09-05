let mic, fft;
const bins = 16384;
function setup() {
    createCanvas(1024, 600);
    noFill();

    mic = new p5.AudioIn();
    mic.start();
    getAudioContext().resume();

    fft = new p5.FFT(0, bins);
    fft.setInput(mic);
}

function draw() {
    getAudioContext().resume();

    background(200);
    noFill();

    let spectrum = fft.analyze();
    let centroid = fft.getCentroid();

    // let rms = fft.getEnergy("rms");
    // console.log(spectrum.length)

    spectrum_peak = 0;
    spectrum_peak_index = 0;

    beginShape();
    for (i = 0; i < spectrum.length; i++) {
        vertex(i / 16, map(spectrum[i], 0, 255, height, 0));
        if (spectrum[i] > spectrum_peak) {
            spectrum_peak = spectrum[i];
            spectrum_peak_index = i;
        }
    }
    endShape();

    spectrum_peak_frequency = spectrum_peak_index * 24000 / bins;

    // peak_energy = 0;
    // peak_frequency = 0;

    // for (i = 0; i < 24000; i++) {
    //     if (fft.getEnergy(i) > peak_energy) {
    //         peak_energy = fft.getEnergy(i);
    //         peak_frequency = i;
    //     }
    //     // fft.getEnergy(i);
    // }

    // write the peak point and value to the top right corner
    textSize(32);
    fill(50);
    // text(peak_frequency, 0, 100);
    // text(peak_energy, 0, 200);
    // text(centroid, 0, 150);
    text(`Spectrum Peak Index: ${spectrum_peak_index}`, 0, 50);
    text(`Spectrum Peak Value: ${spectrum_peak}`, 0, 100);
    text(`Spectrum Peak Frequency: ${spectrum_peak_frequency}`, 0, 150);




    let waveform = fft.waveform();
    noFill();
    beginShape();
    stroke(20);
    strokeWeight(1);
    for (let i = 0; i < waveform.length; i++) {
        let x = map(i, 0, waveform.length, 0, width);
        let y = map(waveform[i], -1, 1, 0, height);
        vertex(x, y);

    }
    endShape();


    // text(rms, width - 100, 200);

    // console.log(peak_point, peak_value);f
}