/* eslint-disable require-jsdoc */
const { json } = require('express');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');

function gifExtractorController() {
    const getRandomIntegerInRange = (min, max) => {
        const minInt = Math.ceil(min);
        const maxInt = Math.floor(max);

        return Math.floor(Math.random() * (maxInt - minInt + 1) + minInt);
    };
    const getStartTimeInSeconds = (
        videoDurationInSeconds,
        fragmentDurationInSeconds,
    ) => {
        const safeVideoDurationInSeconds =
            videoDurationInSeconds - fragmentDurationInSeconds;

        if (safeVideoDurationInSeconds <= 0) {
            return 0;
        }

        return getRandomIntegerInRange(
            0.25 * safeVideoDurationInSeconds,
            0.75 * safeVideoDurationInSeconds,
        );
    };
    const createFragmentPreview = async (
        inputPath,
        outputPath,
        fragmentDurationInSeconds = 4,
    ) => {
        ffmpeg.ffprobe(inputPath, (err, metadata) => {
            if (err) {
                console.error(err);
                return;
            }
            const { duration } = metadata.format;
            const videoDurationInSeconds = Math.floor(duration);
            const startTimeInSeconds = getStartTimeInSeconds(
                videoDurationInSeconds,
                fragmentDurationInSeconds,
            );
            const gifStream = fs.writeFile('uploads/result.gif', function (
                err,
            ) {
                if (err) {
                    console.error(err);
                    return;
                } else {
                    ffmpeg()
                        .input(inputPath)
                        .noAudio()
                        .noVideo()
                        .outputFormat('ass')
                        .save('uploads/subs.ass');
                    ffmpeg()
                        .input(inputPath)
                        .videoFilters('ass=uploads/subs.ass')
                        .setStartTime(startTimeInSeconds)
                        .noAudio()
                        .outputFPS(15)
                        .setDuration(fragmentDurationInSeconds)
                        .outputFormat('gif')
                        .on('error', (err) => console.error(err))
                        .pipe(gifStream, { end: true });
                }
            });
            return gifStream;
        });
    };
    const extractGif = async (req, res) => {
        const inputPath = req.file.path;
        const outputPath = 'uploads/fragment.gif';
        return createFragmentPreview(inputPath, outputPath).then((result) => {
            return res.json(result);
        });
    };

    return { extractGif };
}

module.exports = gifExtractorController;
