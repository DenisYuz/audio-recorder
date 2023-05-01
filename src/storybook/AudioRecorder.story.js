import React from 'react';
import { Story, Meta } from '@storybook/react';
import AudioRecorder from './AudioRecorder';

export default {
  title: 'Components/AudioRecorder',
  component: AudioRecorder,
} as Meta;

const Template: Story = (args) => <AudioRecorder {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const WithUpload = Template.bind({});
WithUpload.args = {
  uploadUrl: '/api/upload-audio',
};
