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

  it ':query key has EIGHT key-value pairs by default' do
    astronomy = Astronomy.new({this: 'that'})
    actual = astronomy.instance_values['options'][:query]
    expect(actual.count).to eq(8)
  end

  it 'the almanac method throws a 400 error if given invalid data' do
    astronomy = Astronomy.new({this: 'that'})
    actual = astronomy.almanac.response.code
    expect(actual).to eq('400')
  end

  it 'the almanac method throws a 200 error when given valid data' do
    astronomy = Astronomy.new({
                  date: '2014/07/02',
                  time: '12:00:00',
                  lat:  '0,0,0',
                  lng:  '0,0,0',
                  tz:   '0'
                })
    actual = astronomy.almanac.response.code
    expect(actual).to eq('200')
  end

end
