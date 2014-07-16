require 'rails_helper'

RSpec.describe Astronomy, :type => :model do

  it 'has one instance variable' do
    astronomy = Astronomy.new({this: 'that'})
    actual = astronomy.instance_variables.count
    expect(actual). to eq(1)
  end

  it 'initializes with an options instance variable' do
    astronomy = Astronomy.new({this: 'that'})
    actual = astronomy.instance_variable_names[0]
    expected = '@options'
    expect(actual).to eq(expected)
  end

  it 'has an instance variable that is a hash' do
    astronomy = Astronomy.new({this: 'that'})
    actual = astronomy.instance_values['options']
    expect(actual.class).to eq(Hash)
  end

  it 'options variable contains a :query key' do
    astronomy = Astronomy.new({this: 'that'})
    actual = astronomy.instance_values['options'].has_key?(:query)
    expect(actual).to be true
  end

end
